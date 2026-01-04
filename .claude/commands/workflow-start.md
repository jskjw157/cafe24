---
description: Start a new workflow pipeline (feature-development, cafe24-app, test-automation, document-driven)
arguments:
  - name: workflow_type
    description: "Workflow type: feature-development | cafe24-app | test-automation | document-driven"
    required: true
  - name: name
    description: "Workflow name (e.g., 'Add shopping cart feature')"
    required: true
---

# Workflow Start Command

새로운 워크플로우 파이프라인을 시작합니다.

## 입력 파라미터

- **workflow_type**: `$ARGUMENTS.workflow_type`
- **name**: `$ARGUMENTS.name`

## 실행 절차

### 1. 워크플로우 템플릿 로드

```
.claude/workflow/templates/{workflow_type}.json 파일을 읽어 워크플로우 정의 로드
```

### 2. 워크플로우 상태 초기화

```yaml
# .claude/workflow/active/{workflow-id}/state.json 생성
id: wf-{timestamp}-{random}
type: {workflow_type}
name: {name}
status: initialized
currentPhase: {first_phase}
progress:
  completedPhases: []
  pendingPhases: [phase1, phase2, ...]
  overallProgress: 0
```

### 3. 사용자 확인

워크플로우 시작 전 다음 정보를 사용자에게 표시:

- 워크플로우 유형 및 이름
- 실행될 단계 목록
- 관련 에이전트 목록
- 예상 소요 시간
- 예상 비용

**사용자 승인을 받은 후에만 진행**

### 4. 첫 번째 에이전트 호출

워크플로우의 첫 번째 Phase에 해당하는 에이전트 호출:

```bash
# tech-lead가 오케스트레이션 시작
# 첫 번째 에이전트에게 핸드오프 메시지 전달
```

## 워크플로우 유형별 안내

### feature-development

신규 기능 개발 파이프라인:
1. 요구사항 분석 (app-requirement-analyzer)
2. 도메인 설계 (ddd-expert)
3. 개발 계획 (feature-planning-expert)
4. 백엔드 구현 (fastapi-expert)
5. 프론트엔드 구현 (cafe24-skin-expert)
6. E2E 테스트 (testsprite-orchestrator)

### cafe24-app

Cafe24 앱 개발 파이프라인:
1. API 문서 수집 (cafe24-api-crawler) - 선택적
2. 요구사항 분석 (app-requirement-analyzer)
3. OAuth 모듈 생성 (cafe24-oauth-generator)
4. 앱 백엔드 구현 (fastapi-expert)
5. 프론트엔드 임베드 (cafe24-skin-expert)

### test-automation

테스트 자동화 파이프라인:
1. 테스트 계획 (playwright-test-planner)
2. 테스트 생성 (playwright-test-generator)
3. 테스트 실행 (testsprite-orchestrator)
4. 테스트 수정 (playwright-test-healer) - 조건부

### document-driven

문서 기반 개발 파이프라인:
1. 문서 검증 (docs-validator)
2. 도메인 추출 (ddd-expert)
3. GitHub 이슈 생성 (github-issues-expert)
4. 개발 계획 (feature-planning-expert)

## 출력

워크플로우 시작 후 다음 정보 반환:

```yaml
workflow_id: wf-xxxxx
status: running
current_phase: requirements
current_agent: app-requirement-analyzer
state_file: .claude/workflow/active/wf-xxxxx/state.json
```

## 예시

```bash
# 신규 기능 개발 워크플로우 시작
/workflow-start feature-development "장바구니 기능 추가"

# Cafe24 앱 개발 워크플로우 시작
/workflow-start cafe24-app "재고 알림 앱"

# 테스트 자동화 워크플로우 시작
/workflow-start test-automation "상품 상세 페이지 E2E 테스트"
```

## 주의사항

- 한 번에 하나의 워크플로우만 활성화 권장
- 워크플로우 중단 시 `/workflow-pause` 사용
- 진행 상황은 `/workflow-status`로 확인
