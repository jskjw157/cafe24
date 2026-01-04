---
name: workflow-start
description: 워크플로우 파이프라인을 시작합니다. 사용법 /workflow-start {type} "{name}" - type은 feature-development, cafe24-app, test-automation, document-driven 중 선택
arguments:
  - name: type
    description: "워크플로우 유형: feature-development | cafe24-app | test-automation | document-driven"
    required: true
  - name: name
    description: "워크플로우 이름 (예: '장바구니 기능 추가')"
    required: true
---

# Workflow Runner Skill

이 스킬은 워크플로우를 자동으로 실행합니다.

## 실행 절차

### 1. 워크플로우 템플릿 확인

먼저 `.claude/workflow/templates/$ARGUMENTS.type.json` 파일을 읽어 워크플로우 정의를 확인하세요.

### 2. 워크플로우 개요 표시

사용자에게 다음 정보를 표시하세요:

```
┌──────────────────────────────────────────────────────────────┐
│  🚀 워크플로우 시작: $ARGUMENTS.name                          │
│  유형: $ARGUMENTS.type                                       │
├──────────────────────────────────────────────────────────────┤
│  Phase 목록:                                                 │
│  1. {phase1.name} - {phase1.agent}                          │
│  2. {phase2.name} - {phase2.agent}                          │
│  ...                                                        │
├──────────────────────────────────────────────────────────────┤
│  예상 시간: {metadata.estimatedDuration}                     │
│  예상 비용: {metadata.estimatedCost}                         │
└──────────────────────────────────────────────────────────────┘
```

### 3. 사용자 확인

AskUserQuestion 도구를 사용하여 확인:
- "워크플로우를 시작할까요?"
- 옵션: "시작", "취소"

### 4. 워크플로우 상태 초기화

`.claude/workflow/active/wf-{timestamp}/state.json` 파일 생성:

```json
{
  "id": "wf-{YYYYMMDD}-{random}",
  "type": "$ARGUMENTS.type",
  "name": "$ARGUMENTS.name",
  "status": "running",
  "startedAt": "{ISO8601}",
  "currentPhase": "{first_phase_id}",
  "progress": {
    "completedPhases": [],
    "overallProgress": 0
  }
}
```

### 5. tech-lead 에이전트 호출

Task 도구를 사용하여 tech-lead 에이전트를 호출하세요:

```
Task(
  subagent_type: "tech-lead",
  description: "Execute workflow pipeline",
  prompt: """
  워크플로우를 실행해주세요.

  [워크플로우 정보]
  - ID: {workflow_id}
  - Type: $ARGUMENTS.type
  - Name: $ARGUMENTS.name
  - State File: .claude/workflow/active/{workflow_id}/state.json

  [지시사항]
  1. 템플릿 파일 읽기: .claude/workflow/templates/$ARGUMENTS.type.json
  2. 각 Phase를 순차적으로 실행
  3. 각 에이전트 결과를 context/ 디렉토리에 JSON으로 저장
  4. 상태 파일 업데이트
  5. 모든 Phase 완료 후 최종 보고

  자동으로 진행하되, 에러 발생 시 보고해주세요.
  """
)
```

### 6. 결과 보고

워크플로우 완료 후:

```
┌──────────────────────────────────────────────────────────────┐
│  ✅ 워크플로우 완료: $ARGUMENTS.name                          │
│  ID: {workflow_id}                                           │
├──────────────────────────────────────────────────────────────┤
│  완료된 Phase:                                               │
│  ✅ Phase 1: {phase1.name}                                   │
│  ✅ Phase 2: {phase2.name}                                   │
│  ...                                                        │
├──────────────────────────────────────────────────────────────┤
│  산출물:                                                     │
│  - context/{agent1}-context.json                            │
│  - context/{agent2}-context.json                            │
│  ...                                                        │
└──────────────────────────────────────────────────────────────┘
```

## 워크플로우 유형

### feature-development
신규 기능 개발 파이프라인
- app-requirement-analyzer → ddd-expert → feature-planning-expert → fastapi-expert → cafe24-skin-expert → testsprite-orchestrator

### cafe24-app
Cafe24 앱 개발 파이프라인
- [cafe24-api-crawler] → app-requirement-analyzer → cafe24-oauth-generator → fastapi-expert → cafe24-skin-expert

### test-automation
테스트 자동화 파이프라인
- playwright-test-planner → playwright-test-generator → testsprite-orchestrator → [playwright-test-healer]

### document-driven
문서 기반 개발 파이프라인
- docs-validator → ddd-expert → github-issues-expert → feature-planning-expert

## 예시

```bash
/workflow-start test-automation "haar E2E 테스트"
/workflow-start feature-development "장바구니 기능 추가"
/workflow-start cafe24-app "재고 알림 앱"
```
