---
description: Manually trigger a handoff between agents in a workflow
arguments:
  - name: target_agent
    description: "Target agent ID to hand off to"
    required: true
  - name: task
    description: "Task description for the target agent"
    required: true
---

# Workflow Handoff Command

워크플로우 내에서 에이전트 간 수동 핸드오프를 실행합니다.

## 입력 파라미터

- **target_agent**: `$ARGUMENTS.target_agent`
- **task**: `$ARGUMENTS.task`

## 핸드오프 프로세스

### 1. 핸드오프 메시지 생성

```typescript
// .claude/workflow/active/{workflow_id}/handoffs/{handoff_id}.json
{
  id: "hf-{timestamp}",
  timestamp: "{now}",
  from: "{current_agent}",
  to: "{target_agent}",
  workflow: {
    id: "{workflow_id}",
    type: "{workflow_type}",
    currentPhase: "{current_phase}",
    nextPhase: "{next_phase}"
  },
  context: {
    primary: { /* 주 컨텍스트 */ },
    supporting: [ /* 참조 컨텍스트들 */ ],
    summary: "컨텍스트 요약..."
  },
  instruction: {
    task: "{task}",
    constraints: [...],
    expectedOutput: "..."
  }
}
```

### 2. 컨텍스트 준비

현재 에이전트의 출력 컨텍스트를 대상 에이전트의 입력으로 변환:

```yaml
Context Preparation:
  1. 현재 컨텍스트 검증 (validation: valid)
  2. 토큰 최적화 (요약 생성)
  3. 참조 컨텍스트 수집
  4. 핸드오프 메시지 저장
```

### 3. 대상 에이전트 호출

```bash
# 핸드오프 메시지와 함께 대상 에이전트 호출
claude -p "다음 핸드오프 메시지를 처리해주세요: {handoff_message}" @{target_agent}
```

### 4. 결과 수신 및 기록

```typescript
// 핸드오프 결과 기록
{
  handoffId: "hf-xxxxx",
  status: "success" | "partial" | "failed",
  outputContext: { /* 생성된 컨텍스트 */ },
  processingTime: {
    startedAt: "...",
    completedAt: "...",
    durationMs: 45000
  },
  tokenUsage: {
    input: 5000,
    output: 3000,
    total: 8000
  },
  nextAction: {
    type: "continue",
    targetAgent: "next-agent",
    context: { /* 다음 컨텍스트 */ }
  }
}
```

## 지원 에이전트

### 요구사항/분석 계열

| Agent ID | 설명 | 입력 컨텍스트 | 출력 컨텍스트 |
|----------|------|--------------|--------------|
| `app-requirement-analyzer` | 요구사항 분석 | user-request | RequirementContext |
| `docs-validator` | 문서 검증 | document-paths | ValidationContext |

### 설계 계열

| Agent ID | 설명 | 입력 컨텍스트 | 출력 컨텍스트 |
|----------|------|--------------|--------------|
| `ddd-expert` | 도메인 설계 | RequirementContext | DomainContext |
| `feature-planning-expert` | 개발 계획 | DomainContext | PlanningContext |

### 구현 계열

| Agent ID | 설명 | 입력 컨텍스트 | 출력 컨텍스트 |
|----------|------|--------------|--------------|
| `fastapi-expert` | 백엔드 구현 | PlanningContext | ImplementationContext |
| `cafe24-skin-expert` | 프론트엔드 구현 | ImplementationContext | FrontendContext |
| `cafe24-oauth-generator` | OAuth 모듈 | RequirementContext | OAuthContext |

### 테스트 계열

| Agent ID | 설명 | 입력 컨텍스트 | 출력 컨텍스트 |
|----------|------|--------------|--------------|
| `playwright-test-planner` | 테스트 계획 | codebase-context | TestPlanContext |
| `playwright-test-generator` | 테스트 생성 | TestPlanContext | TestCodeContext |
| `testsprite-orchestrator` | 테스트 실행 | TestCodeContext | TestContext |
| `playwright-test-healer` | 테스트 수정 | TestContext | HealedTestContext |

### 기타

| Agent ID | 설명 | 입력 컨텍스트 | 출력 컨텍스트 |
|----------|------|--------------|--------------|
| `cafe24-api-crawler` | API 문서 수집 | - | ApiKnowledgeContext |
| `github-issues-expert` | 이슈 생성 | DomainContext | IssueContext |

## 컨텍스트 요약 전략

토큰 절감을 위해 핸드오프 시 컨텍스트 요약 적용:

```yaml
Summary Strategy:
  RequirementContext:
    - features.core만 전달 (optional 제외)
    - architecture 요약
    - cafe24.requiredScopes만 전달

  DomainContext:
    - boundedContexts 이름 + responsibility만
    - aggregates 이름 + rootEntity만
    - ubiquitousLanguage 상위 10개만

  ImplementationContext:
    - artifacts.files 경로만
    - api.endpoints 요약
    - runtime 정보 전체
```

## 에스컬레이션

핸드오프 실패 시 자동 에스컬레이션:

```yaml
Escalation Rules:
  - max_retries_exceeded: → tech-lead
  - validation_failed: → tech-lead
  - timeout: → tech-lead
  - permission_error: → user
```

## 예시

```bash
# ddd-expert에게 도메인 설계 요청
/workflow-handoff ddd-expert "RequirementContext 기반으로 Bounded Context와 Aggregate 설계"

# fastapi-expert에게 구현 요청
/workflow-handoff fastapi-expert "PlanningContext의 Phase 1 백엔드 API 구현"

# playwright-test-healer에게 테스트 수정 요청
/workflow-handoff playwright-test-healer "실패한 테스트 3건 분석 및 수정"
```

## 출력

```yaml
Handoff Result:
  handoff_id: hf-xxxxx
  status: success
  from: ddd-expert
  to: feature-planning-expert
  duration: 45.2s
  tokens_used: 8,450
  output_context: planning-abc123.json

Next Action:
  type: continue
  target: fastapi-expert
  phase: implementation
```

## 주의사항

- 핸드오프는 순차적으로 실행 (병렬 핸드오프 미지원)
- 대상 에이전트가 필요로 하는 컨텍스트가 준비되어 있어야 함
- 핸드오프 실패 시 자동 재시도 (최대 2회)
- 모든 핸드오프 이력은 `.claude/workflow/active/{workflow_id}/handoffs/`에 기록
