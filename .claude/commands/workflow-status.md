---
description: Check the current workflow status and progress
arguments:
  - name: workflow_id
    description: "Workflow ID (optional, defaults to active workflow)"
    required: false
---

# Workflow Status Command

현재 워크플로우의 상태와 진행 상황을 확인합니다.

## 입력 파라미터

- **workflow_id**: `$ARGUMENTS.workflow_id` (선택, 기본값: 활성 워크플로우)

## 실행 절차

### 1. 워크플로우 상태 파일 로드

```bash
# 활성 워크플로우 목록 확인
ls .claude/workflow/active/

# 특정 워크플로우 상태 로드
cat .claude/workflow/active/{workflow_id}/state.json
```

### 2. 상태 정보 표시

## 출력 형식

### 기본 정보

```
================================================================================
                          WORKFLOW STATUS
================================================================================

  ID:          wf-xxxxx-yyyyy
  Type:        feature-development
  Name:        장바구니 기능 추가
  Status:      running

================================================================================
```

### 진행 상황

```
                          PROGRESS
--------------------------------------------------------------------------------

  Overall: ████████████░░░░░░░░ 60%

  Phases:
    [x] requirements     - app-requirement-analyzer     (completed)
    [x] design           - ddd-expert                   (completed)
    [x] planning         - feature-planning-expert      (completed)
    [>] implementation   - fastapi-expert               (in progress)
    [ ] frontend         - cafe24-skin-expert           (pending)
    [ ] testing          - testsprite-orchestrator      (pending)

--------------------------------------------------------------------------------
```

### 현재 단계 상세

```
                       CURRENT PHASE
--------------------------------------------------------------------------------

  Phase:        implementation
  Agent:        fastapi-expert
  Started:      2025-01-04 10:30:00
  Duration:     15m 32s

  Input Context:
    - DomainContext (domain-xxxxx.json)
    - PlanningContext (planning-xxxxx.json)

  Expected Output:
    - ImplementationContext

--------------------------------------------------------------------------------
```

### 메트릭

```
                          METRICS
--------------------------------------------------------------------------------

  Duration:           45m 12s
  Token Usage:        28,450 tokens
  Estimated Cost:     $4.27

  By Agent:
    - app-requirement-analyzer:  5,200 tokens
    - ddd-expert:                8,100 tokens
    - feature-planning-expert:   6,050 tokens
    - fastapi-expert:            9,100 tokens (in progress)

  Handoffs:           3 completed, 0 failed
  Retries:            0
  Errors:             0

--------------------------------------------------------------------------------
```

### 컨텍스트 체인

```
                       CONTEXT CHAIN
--------------------------------------------------------------------------------

  1. requirement-abc123.json
     Created by: app-requirement-analyzer
     Phase: requirements
     Confidence: 0.92

  2. domain-def456.json
     Created by: ddd-expert
     Phase: design
     Confidence: 0.88

  3. planning-ghi789.json
     Created by: feature-planning-expert
     Phase: planning
     Confidence: 0.90

  4. (pending) implementation-*.json
     Agent: fastapi-expert
     Phase: implementation

--------------------------------------------------------------------------------
```

### 체크포인트

```
                       CHECKPOINTS
--------------------------------------------------------------------------------

  Available checkpoints for recovery:

  1. cp-1704348600 (design phase)
     Created: 2025-01-04 10:10:00
     Reason: auto

  2. cp-1704349200 (planning phase)
     Created: 2025-01-04 10:20:00
     Reason: auto

  Use `/workflow-resume {workflow_id} --checkpoint {checkpoint_id}` to restore

--------------------------------------------------------------------------------
```

## 상태별 표시

### Running

```
Status: running
Current Agent: fastapi-expert
Action: 진행 중... 완료까지 약 10분 예상
```

### Paused

```
Status: paused
Paused At: 2025-01-04 10:45:00
Reason: User requested pause
Action: `/workflow-resume {workflow_id}`로 재개
```

### Waiting Input

```
Status: waiting_input
Waiting For: User approval
Message: "생성된 API 엔드포인트 목록을 확인해주세요"
Timeout: 30분 후 자동 취소
```

### Failed

```
Status: failed
Failed At: 2025-01-04 10:45:00
Phase: implementation
Agent: fastapi-expert
Error: "Database connection failed"
Recoverable: Yes
Suggested Action: "/workflow-resume {workflow_id} --retry"
```

### Completed

```
Status: completed
Completed At: 2025-01-04 11:15:00
Total Duration: 1h 15m
Final Artifacts:
  - Backend: src/api/...
  - Frontend: skin/...
  - Tests: tests/e2e/...
```

## 예시

```bash
# 현재 활성 워크플로우 상태 확인
/workflow-status

# 특정 워크플로우 상태 확인
/workflow-status wf-abc123-xyz789

# 간단한 상태만 확인
/workflow-status --brief
```

## 관련 명령어

- `/workflow-start` - 새 워크플로우 시작
- `/workflow-resume` - 일시정지된 워크플로우 재개
- `/workflow-cancel` - 워크플로우 취소
