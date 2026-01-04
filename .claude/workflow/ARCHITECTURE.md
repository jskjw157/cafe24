# Cafe24 에이전트 핸드오프 워크플로우 아키텍처

이 문서는 Cafe24 프로젝트의 에이전트 간 핸드오프 워크플로우 아키텍처를 설명합니다.

## 목차

1. [개요](#개요)
2. [아키텍처 다이어그램](#아키텍처-다이어그램)
3. [워크플로우 정의](#워크플로우-정의)
4. [컨텍스트 스키마](#컨텍스트-스키마)
5. [핸드오프 프로토콜](#핸드오프-프로토콜)
6. [상태 관리](#상태-관리)
7. [파일 구조](#파일-구조)
8. [사용 방법](#사용-방법)

---

## 개요

### 설계 원칙

1. **파일 기반 상태 공유**: 에이전트 간 컨텍스트는 JSON 파일로 저장/전달
2. **단방향 흐름(DAG)**: Worker 에이전트는 Manager를 호출하지 않음
3. **토큰 최적화**: 핸드오프 시 컨텍스트 요약으로 토큰 절감
4. **복구 가능성**: 체크포인트를 통한 워크플로우 복구 지원
5. **투명성**: 모든 핸드오프와 상태 변경 로깅

### 에이전트 역할 분류

```
┌─────────────────────────────────────────────────────────────┐
│                      ORCHESTRATOR                           │
│                       tech-lead                             │
│  - 워크플로우 관리, 에이전트 조율, 에스컬레이션 처리        │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│   ANALYZERS   │   │   DESIGNERS   │   │  IMPLEMENTERS │
├───────────────┤   ├───────────────┤   ├───────────────┤
│ requirement-  │   │ ddd-expert    │   │ fastapi-      │
│ analyzer      │   │               │   │ expert        │
│               │   │ feature-      │   │               │
│ docs-         │   │ planning-     │   │ cafe24-skin-  │
│ validator     │   │ expert        │   │ expert        │
│               │   │               │   │               │
│ cafe24-api-   │   │               │   │ cafe24-oauth- │
│ crawler       │   │               │   │ generator     │
└───────────────┘   └───────────────┘   └───────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              ▼
                    ┌───────────────┐
                    │    TESTERS    │
                    ├───────────────┤
                    │ playwright-   │
                    │ test-planner  │
                    │               │
                    │ playwright-   │
                    │ test-generator│
                    │               │
                    │ testsprite-   │
                    │ orchestrator  │
                    │               │
                    │ playwright-   │
                    │ test-healer   │
                    └───────────────┘
```

---

## 아키텍처 다이어그램

### 전체 시스템 아키텍처

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER REQUEST                                    │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              TECH-LEAD                                       │
│                         (Workflow Orchestrator)                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  1. 요청 분석 → 2. 워크플로우 선택 → 3. 에이전트 조율 → 4. 결과 통합  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    ▼                ▼                ▼
            ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
            │  Workflow 1  │ │  Workflow 2  │ │  Workflow 3  │
            │  Feature Dev │ │  Cafe24 App  │ │ Test Automat │
            └──────────────┘ └──────────────┘ └──────────────┘
                    │                │                │
                    ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CONTEXT STORAGE                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  .claude/workflow/active/{workflow_id}/                              │   │
│  │    ├── state.json         # 워크플로우 상태                          │   │
│  │    ├── context/           # 에이전트 출력 컨텍스트                   │   │
│  │    ├── handoffs/          # 핸드오프 메시지 로그                     │   │
│  │    └── checkpoints/       # 복구용 체크포인트                        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 핸드오프 플로우

```
┌───────────┐     Handoff Message      ┌───────────┐
│  Agent A  │ ─────────────────────▶   │  Agent B  │
│           │                          │           │
│  Output:  │   {                      │  Input:   │
│  Context  │     from: "agent-a",     │  Context  │
│     A     │     to: "agent-b",       │     A     │
│           │     context: {...},      │           │
│           │     instruction: {...}   │  Output:  │
│           │   }                      │  Context  │
│           │                          │     B     │
└───────────┘                          └───────────┘
      │                                      │
      │         ┌──────────────┐             │
      └────────▶│ Context Store │◀───────────┘
                │              │
                │ context-a.json│
                │ context-b.json│
                └──────────────┘
```

---

## 워크플로우 정의

### Workflow 1: 신규 기능 개발 (Feature Development)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                    FEATURE DEVELOPMENT PIPELINE                           │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐      │
│  │ REQUIREMENTS    │    │     DESIGN      │    │    PLANNING     │      │
│  │                 │    │                 │    │                 │      │
│  │ app-requirement │───▶│   ddd-expert    │───▶│ feature-planning│      │
│  │ -analyzer       │    │                 │    │ -expert         │      │
│  │                 │    │                 │    │                 │      │
│  │ Output:         │    │ Output:         │    │ Output:         │      │
│  │ Requirement     │    │ Domain          │    │ Planning        │      │
│  │ Context         │    │ Context         │    │ Context         │      │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘      │
│           │                     │                     │                  │
│           └─────────────────────┼─────────────────────┘                  │
│                                 ▼                                        │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐      │
│  │ IMPLEMENTATION  │    │    FRONTEND     │    │     TESTING     │      │
│  │                 │    │                 │    │                 │      │
│  │ fastapi-expert  │───▶│ cafe24-skin-    │───▶│ testsprite-     │      │
│  │                 │    │ expert          │    │ orchestrator    │      │
│  │                 │    │                 │    │                 │      │
│  │ Output:         │    │ Output:         │    │ Output:         │      │
│  │ Implementation  │    │ Frontend        │    │ Test            │      │
│  │ Context         │    │ Context         │    │ Context         │      │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘      │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘

예상 소요: 2-4시간 | 예상 비용: $6-10 | 토큰: ~50,000
```

### Workflow 2: Cafe24 앱 개발 (App Development)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                    CAFE24 APP DEVELOPMENT PIPELINE                        │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐      │
│  │  API CRAWLING   │    │  REQUIREMENTS   │    │     OAUTH       │      │
│  │   (optional)    │    │                 │    │                 │      │
│  │ cafe24-api-     │───▶│ app-requirement │───▶│ cafe24-oauth-   │      │
│  │ crawler         │    │ -analyzer       │    │ generator       │      │
│  │                 │    │                 │    │                 │      │
│  │ Output:         │    │ Output:         │    │ Output:         │      │
│  │ ApiKnowledge    │    │ Requirement     │    │ OAuth           │      │
│  │ Context         │    │ Context         │    │ Context         │      │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘      │
│                                                        │                 │
│                                 ┌──────────────────────┘                 │
│                                 ▼                                        │
│                         ┌─────────────────┐    ┌─────────────────┐      │
│                         │ IMPLEMENTATION  │    │    FRONTEND     │      │
│                         │                 │    │     EMBED       │      │
│                         │ fastapi-expert  │───▶│ cafe24-skin-    │      │
│                         │                 │    │ expert          │      │
│                         │                 │    │                 │      │
│                         │ Output:         │    │ Output:         │      │
│                         │ Implementation  │    │ Frontend        │      │
│                         │ Context         │    │ Context         │      │
│                         └─────────────────┘    └─────────────────┘      │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘

예상 소요: 1-3시간 | 예상 비용: $4-8 | 토큰: ~35,000
```

### Workflow 3: 테스트 자동화 (Test Automation)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                    TEST AUTOMATION PIPELINE                               │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐      │
│  │  TEST PLANNING  │    │ TEST GENERATION │    │ TEST EXECUTION  │      │
│  │                 │    │                 │    │                 │      │
│  │ playwright-test │───▶│ playwright-test │───▶│ testsprite-     │      │
│  │ -planner        │    │ -generator      │    │ orchestrator    │      │
│  │                 │    │                 │    │                 │      │
│  │ Output:         │    │ Output:         │    │ Output:         │      │
│  │ TestPlan        │    │ TestCode        │    │ TestResult      │      │
│  │ Context         │    │ Context         │    │ Context         │      │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘      │
│                                                        │                 │
│                                                        ▼                 │
│                                               ┌───────────────┐          │
│                                               │ Tests Failed? │          │
│                                               └───────┬───────┘          │
│                                                 Yes   │   No             │
│                                            ┌──────────┴──────────┐       │
│                                            ▼                     ▼       │
│                                   ┌─────────────────┐    ┌───────────┐  │
│                                   │  TEST HEALING   │    │  COMPLETE │  │
│                                   │                 │    │           │  │
│                                   │ playwright-test │    │           │  │
│                                   │ -healer         │────┘           │  │
│                                   │                 │  (Loop max 3x) │  │
│                                   └─────────────────┘                │  │
│                                            │                         │  │
│                                            └─────────────────────────┘  │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘

예상 소요: 30-60분 | 예상 비용: $2-4 | 토큰: ~20,000
```

### Workflow 4: 문서 기반 개발 (Document-Driven Development)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                DOCUMENT-DRIVEN DEVELOPMENT PIPELINE                       │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────┐    ┌─────────────────┐                              │
│  │ DOC VALIDATION  │    │ DOMAIN EXTRACT  │                              │
│  │                 │    │                 │                              │
│  │ docs-validator  │───▶│   ddd-expert    │                              │
│  │                 │    │                 │                              │
│  │ Input:          │    │                 │                              │
│  │ - 화면정의서    │    │ Output:         │                              │
│  │ - DB정의서      │    │ Domain          │                              │
│  │ - API계약서     │    │ Context         │                              │
│  │                 │    │                 │                              │
│  │ Output:         │    │                 │                              │
│  │ Validation      │    │                 │                              │
│  │ Context         │    │                 │                              │
│  └─────────────────┘    └─────────────────┘                              │
│           │                     │                                        │
│           │    ┌────────────────┘                                        │
│           │    │                                                         │
│           ▼    ▼                                                         │
│  ┌─────────────────┐    ┌─────────────────┐                              │
│  │  ISSUE CREATE   │    │    PLANNING     │                              │
│  │                 │    │                 │                              │
│  │ github-issues-  │───▶│ feature-planning│                              │
│  │ expert          │    │ -expert         │                              │
│  │                 │    │                 │                              │
│  │ Output:         │    │ Output:         │                              │
│  │ Issue           │    │ Planning        │                              │
│  │ Context         │    │ Context         │                              │
│  └─────────────────┘    └─────────────────┘                              │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘

예상 소요: 30-60분 | 예상 비용: $3-5 | 토큰: ~25,000
```

---

## 컨텍스트 스키마

### 컨텍스트 상속 구조

```
                    BaseContext
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
  RequirementContext  DomainContext  PlanningContext
         │               │               │
         │               │               │
         ▼               ▼               ▼
  ┌──────────────────────────────────────────┐
  │           ImplementationContext           │
  │                     │                     │
  │         ┌───────────┴───────────┐        │
  │         ▼                       ▼        │
  │  FrontendContext          TestContext    │
  └──────────────────────────────────────────┘
```

### 주요 컨텍스트 요약

| Context | Agent | 핵심 필드 |
|---------|-------|----------|
| RequirementContext | app-requirement-analyzer | features, cafe24.requiredApis, architecture |
| DomainContext | ddd-expert | boundedContexts, aggregates, domainEvents |
| PlanningContext | feature-planning-expert | phases, timeline, qualityGates |
| ImplementationContext | fastapi-expert | artifacts, api.endpoints, runtime |
| FrontendContext | cafe24-skin-expert | skinFiles, moduleVariables, styles |
| TestContext | testsprite-orchestrator | results, testCases, failures |
| OAuthContext | cafe24-oauth-generator | module, oauthConfig, integration |
| ValidationContext | docs-validator | validation, issues, consistency |
| IssueContext | github-issues-expert | milestones, issues, links |

---

## 핸드오프 프로토콜

### 핸드오프 메시지 구조

```typescript
interface HandoffMessage {
  id: string;
  timestamp: string;
  from: AgentId;
  to: AgentId;
  workflow: {
    id: string;
    type: WorkflowType;
    currentPhase: WorkflowPhase;
    nextPhase: WorkflowPhase;
  };
  context: {
    primary: BaseContext;      // 주 컨텍스트
    supporting: BaseContext[]; // 참조 컨텍스트
    summary: string;           // 토큰 절감용 요약
  };
  instruction: {
    task: string;
    constraints: string[];
    expectedOutput: string;
  };
  metadata: {
    priority: 'low' | 'normal' | 'high' | 'critical';
    timeoutMs: number;
    retryable: boolean;
  };
}
```

### 핸드오프 순서도

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         HANDOFF PROTOCOL                                  │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   Agent A                      Orchestrator                    Agent B   │
│      │                              │                              │     │
│      │  1. Task Complete            │                              │     │
│      │─────────────────────────────▶│                              │     │
│      │     + OutputContext          │                              │     │
│      │                              │                              │     │
│      │                              │  2. Validate Context         │     │
│      │                              │─────────────────┐            │     │
│      │                              │                 │            │     │
│      │                              │◀────────────────┘            │     │
│      │                              │                              │     │
│      │                              │  3. Create Handoff Message   │     │
│      │                              │─────────────────┐            │     │
│      │                              │                 │            │     │
│      │                              │◀────────────────┘            │     │
│      │                              │                              │     │
│      │                              │  4. Handoff                  │     │
│      │                              │─────────────────────────────▶│     │
│      │                              │     + Context + Instruction  │     │
│      │                              │                              │     │
│      │                              │                              │  5. │
│      │                              │                              │  Pro│
│      │                              │                              │  ces│
│      │                              │                              │  s  │
│      │                              │                              │     │
│      │                              │  6. Result                   │     │
│      │                              │◀─────────────────────────────│     │
│      │                              │     + OutputContext          │     │
│      │                              │                              │     │
│      │                              │  7. Update Workflow State    │     │
│      │                              │─────────────────┐            │     │
│      │                              │                 │            │     │
│      │                              │◀────────────────┘            │     │
│      │                              │                              │     │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 상태 관리

### 워크플로우 상태 전이

```
     ┌──────────────────────────────────────────────────────────────┐
     │                    WORKFLOW STATE MACHINE                     │
     └──────────────────────────────────────────────────────────────┘

                              ┌─────────────┐
                              │ INITIALIZED │
                              └──────┬──────┘
                                     │ start
                                     ▼
            ┌──────────────────────────────────────────────────┐
            │                                                  │
      pause │                   ┌─────────┐                    │ complete
      ┌─────┼───────────────────│ RUNNING │────────────────────┼─────┐
      │     │                   └────┬────┘                    │     │
      │     │                        │                         │     │
      │     │         need_input     │     error               │     │
      │     │              ┌─────────┴─────────┐               │     │
      │     │              │                   │               │     │
      │     │              ▼                   ▼               │     │
      │     │     ┌──────────────┐     ┌──────────┐            │     │
      │     │     │WAITING_INPUT │     │  FAILED  │            │     │
      │     │     └──────┬───────┘     └──────────┘            │     │
      │     │            │                   │                 │     │
      │     │   input    │                   │ retry           │     │
      │     │            │                   │                 │     │
      │     │            └─────────┬─────────┘                 │     │
      │     │                      │                           │     │
      │     │                      ▼                           │     │
      │     │                 ┌─────────┐                      │     │
      │     │                 │ RUNNING │                      │     │
      │     │                 └─────────┘                      │     │
      │     │                                                  │     │
      │     └──────────────────────────────────────────────────┘     │
      │                                                              │
      ▼                                                              ▼
┌──────────┐        cancel         ┌───────────┐            ┌───────────┐
│  PAUSED  │──────────────────────▶│ CANCELLED │            │ COMPLETED │
└────┬─────┘                       └───────────┘            └───────────┘
     │
     │ resume
     │
     ▼
┌─────────┐
│ RUNNING │
└─────────┘
```

### 체크포인트 전략

```yaml
Checkpoint Triggers:
  - 각 Phase 완료 시 (자동)
  - 품질 게이트 통과 후 (자동)
  - 사용자 승인 후 (자동)
  - 위험한 작업 전 (자동)
  - 사용자 요청 시 (수동)

Checkpoint Contents:
  - 현재 워크플로우 상태
  - 모든 컨텍스트 스냅샷
  - 핸드오프 이력
  - 메트릭 스냅샷
```

---

## 파일 구조

```
.claude/
├── agents/                              # 에이전트 정의
│   ├── tech-lead.md                     # 오케스트레이터
│   ├── ddd-expert.md
│   ├── feature-planning-expert.md
│   ├── app-requirement-analyzer.md
│   ├── cafe24-skin-expert.md
│   ├── cafe24-api-crawler.md
│   ├── cafe24-oauth-generator.md
│   ├── fastapi-expert.md
│   ├── testsprite-orchestrator.md
│   ├── playwright-test-planner.md
│   ├── playwright-test-generator.md
│   ├── playwright-test-healer.md
│   ├── docs-validator.md
│   └── github-issues-expert.md
│
├── types/                               # TypeScript 스키마 (문서용)
│   ├── context.ts                       # 기본 컨텍스트 타입
│   ├── agent-contexts.ts                # 에이전트별 컨텍스트
│   ├── handoff.ts                       # 핸드오프 메시지 타입
│   └── workflow-state.ts                # 워크플로우 상태 타입
│
├── workflow/
│   ├── ARCHITECTURE.md                  # 이 문서
│   │
│   ├── templates/                       # 워크플로우 템플릿
│   │   ├── feature-development.json
│   │   ├── cafe24-app-development.json
│   │   ├── test-automation.json
│   │   └── document-driven-development.json
│   │
│   ├── active/                          # 진행 중인 워크플로우
│   │   └── {workflow-id}/
│   │       ├── state.json               # 현재 상태
│   │       ├── context/                 # 컨텍스트 저장소
│   │       │   ├── requirement-{id}.json
│   │       │   ├── domain-{id}.json
│   │       │   └── ...
│   │       ├── handoffs/                # 핸드오프 로그
│   │       │   └── {timestamp}-{from}-{to}.json
│   │       └── checkpoints/             # 체크포인트
│   │           └── {phase}-{timestamp}.json
│   │
│   └── completed/                       # 완료된 워크플로우
│       └── {workflow-id}/
│           └── summary.json
│
├── commands/                            # 워크플로우 명령어
│   ├── workflow-start.md
│   ├── workflow-status.md
│   ├── workflow-handoff.md
│   └── workflow-resume.md
│
├── rules/                               # 규칙
│   ├── 00-script-first.md
│   └── model-selection.md
│
└── settings.json
```

---

## 사용 방법

### 워크플로우 시작

```bash
# 신규 기능 개발
/workflow-start feature-development "장바구니 기능 추가"

# Cafe24 앱 개발
/workflow-start cafe24-app "재고 알림 앱"

# 테스트 자동화
/workflow-start test-automation "상품 상세 E2E 테스트"

# 문서 기반 개발
/workflow-start document-driven "PRD 기반 개발"
```

### 진행 상황 확인

```bash
# 현재 워크플로우 상태
/workflow-status

# 특정 워크플로우
/workflow-status wf-xxxxx
```

### 수동 핸드오프

```bash
# 특정 에이전트에게 작업 위임
/workflow-handoff ddd-expert "Bounded Context 설계"
```

### 워크플로우 제어

```bash
# 일시정지
/workflow-pause

# 재개
/workflow-resume

# 특정 체크포인트에서 재개
/workflow-resume --checkpoint cp-xxxxx

# 취소
/workflow-cancel
```

---

## 비용 최적화 전략

### 모델 선택 가이드

| Phase | 권장 모델 | 이유 |
|-------|----------|------|
| Requirements | Opus | 복잡한 분석 필요 |
| Design (DDD) | Opus | 아키텍처 결정 |
| Planning | Opus/Sonnet | 복잡도에 따라 |
| Implementation | Sonnet | 표준 코드 생성 |
| Testing | Sonnet | 테스트 코드 생성 |
| Documentation | Haiku | 템플릿 기반 |

### 토큰 절감 기법

1. **컨텍스트 요약**: 핸드오프 시 전체 컨텍스트 대신 요약 전달
2. **선택적 컨텍스트**: 필요한 필드만 전달
3. **체크포인트 활용**: 실패 시 처음부터 재시작하지 않음
4. **스크립트 우선**: 데이터 수집/변환은 스크립트로

---

## 버전 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|----------|
| 1.0.0 | 2025-01-04 | 초기 아키텍처 설계 |
