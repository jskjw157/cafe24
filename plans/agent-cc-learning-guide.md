# Agent CC 프로젝트 학습 가이드

## 프로젝트 개요

**Agent CC**는 Claude Code 환경에서 **Kotlin/Spring Boot 개발**을 위한 전문화된 에이전트, 스킬, 훅, 워크플로우를 제공하는 개발 생산성 플랫폼입니다.

---

## 프로젝트 구조

```
/agent_cc/
├── .claude/                    # Claude Code 설정
│   ├── settings.local.json     # 권한 및 훅 설정
│   ├── agents/                 # 2개 에이전트
│   ├── skills/                 # 11개 스킬
│   └── hooks/                  # 자동화 훅
└── .agent/                     # 에이전트 정책
    ├── rules/                  # 10개 규칙
    └── workflows/              # 8개 워크플로우
```

---

## 1. 에이전트 (Agents) 상세

### code-reviewer
- **역할**: Kotlin/Spring Boot 코드 품질, 보안, 성능 분석
- **모델**: haiku (빠른 처리)
- **자동 트리거**: 기능 구현, 버그 수정, 리팩토링 완료 후
- **사용 도구**: Read, Grep, Glob, Bash
- **출력**: Critical/Warnings/Suggestions 분류된 리포트
- **호출**: `/review`, `/review <파일>`, `/review-pr <번호>`

### doc-writer
- **역할**: KDoc 작성, 인라인 주석 추가
- **모델**: haiku
- **자동 트리거**: 코드 작성/수정 후, "문서화" 키워드 요청 시
- **사용 도구**: Read, Edit, Grep, Glob
- **원칙**: DRY (Interface에 KDoc 작성 시 Impl 중복 금지)

---

## 2. 스킬 (Skills) 상세 - 11개

### 개발 기획 스킬

| 스킬 | 용도 | 입력 | 출력 |
|------|------|------|------|
| `/feature-planner` | TDD 기반 페이즈별 기능 계획 | 요구사항 | `docs/plans/PLAN_<name>.md` |
| `/ddd-planning` | DDD 도메인 설계 | 화면정의서, DB정의서 | Bounded Context, Aggregate 설계서 |

### 코드 품질 스킬

| 스킬 | 용도 | 출력 |
|------|------|------|
| `/code-review` | 코드 리뷰 | 보안/성능/버그 리포트 |
| `/doc-writer` | 문서화 | KDoc/인라인 주석 |

### 자동화 도구 생성 스킬

| 스킬 | 생성물 | 저장 위치 |
|------|--------|----------|
| `/skill-creator` | Skills (재사용 패키지) | `.claude/skills/` |
| `/subagent-creator` | Sub-agents (특화 AI) | `.claude/agents/` |
| `/slash-command-creator` | Slash Commands | `.claude/commands/` |
| `/hook-creator` | Hooks (생명주기) | `settings.json` |

### 프로젝트 관리 스킬

| 스킬 | 용도 | 출력 |
|------|------|------|
| `/github-issues` | 기획서 → 이슈 생성 | GitHub Issues, Milestones |
| `/validate-docs` | 문서 정합성 검증 | 불일치 리포트 |

---

## 3. 훅 (Hooks)

### run-tests-on-kotlin.py
- **트리거**: Edit/Write 도구 사용 후 (PostToolUse)
- **조건**: `.kt` 파일 && `/src/main/` 또는 `/src/test/` 경로
- **동작**: `gradlew :string_registry_meta:test --quiet` 실행
- **특징**: Non-blocking (실패해도 작업 진행)

---

## 4. 스킬 간 워크플로우

```
프로젝트 시작
    ↓
/ddd-planning ──→ 도메인 모델 설계
    ↓
/feature-planner ─→ 기능별 개발 계획
    ↓
/github-issues ──→ 이슈 자동 생성
    ↓
코드 개발 ──→ [훅: 자동 테스트]
    ↓
/code-review ──→ 품질 검토
    ↓
/doc-writer ──→ 문서화
    ↓
/validate-docs ──→ 정합성 검증
```

---

## 5. 확장 방법

### 새 스킬 추가
```bash
/skill-creator  # 가이드에 따라 스킬 생성
```
- SKILL.md + scripts/ + references/ 구조
- `.claude/skills/<name>/` 에 저장

### 새 에이전트 추가
```bash
/subagent-creator  # 가이드에 따라 에이전트 생성
```
- YAML 프론트매터 + 시스템 프롬프트
- `.claude/agents/<name>.md` 에 저장

### 새 훅 추가
```bash
/hook-creator  # 가이드에 따라 훅 생성
```
- settings.json의 hooks 섹션에 추가
- PreToolUse, PostToolUse, Notification 등 이벤트 선택

---

---

## 7. 규칙 (Rules) 상세 - 10개

### 항상 적용되는 규칙 (always_on)

| 규칙 | 목적 | 핵심 내용 |
|------|------|----------|
| **00-language** | 한국어 강제 | 모든 응답/산출물 한국어 |
| **02-thinking** | 체계적 문제해결 | Sequential Thinking MCP 사용 |
| **03-mcp-strategy** | 도구 사용 전략 | 소스 우선순위, MCP 호출 제한 |
| **default** | 멘토십 마인드 | 교육 중심, 문서 우선, 파일 수정 정책 |
| **Strong_Reasoner** | 체계적 추론 | 9가지 추론 차원 적용 |

### 상황별 적용 규칙 (model_decision)

| 규칙 | 트리거 | 핵심 내용 |
|------|--------|----------|
| **04-meta-rule** | `/setup-rules`, `/fetch-rule` | 규칙 자동 생성기 |
| **Code_Review_Agent** | 코드 리뷰 요청 | 8가지 분석 영역 |
| **Bug_Hunter** | 버그/디버깅 요청 | 8단계 디버깅 프로세스 |
| **LLM_Expert** | 프롬프트 설계 요청 | 프롬프트 구조화 가이드 |
| **kotlin-springboot** | Kotlin 코드 작성 | Kotlin 모범 사례 |

---

## 8. 워크플로우 (Workflows) 상세 - 8개

### 문서/정보 수집 워크플로우

| 워크플로우 | 목적 | 사용 시점 |
|-----------|------|----------|
| **WF.DOCS_LADDER** | 공식 문서 최소 주입 | 외부 문서 필요 시 (기본값) |
| **WF.GITHUB.UPSTREAM** | 업스트림 진실 확인 | 버그/마이그레이션 확인 |
| **WF.WEB_RESEARCH** | 웹 조사/스크래핑 | URL 제공 또는 동의 후 |

### 규칙 관리 워크플로우

| 워크플로우 | 명령어 | 목적 |
|-----------|--------|------|
| **setup-rules** | `/setup-rules` | 프로젝트 규칙 자동 설정 |
| **fetch-rule** | `/fetch-rule {tech}` | 특정 기술 규칙 가져오기 |

### 특수 목적 워크플로우

| 워크플로우 | 목적 |
|-----------|------|
| **default** | 기본 작업 접근 방식 |
| **WF.DETAIL_PAGE_FACTORY** | Cafe24 상품 상세페이지 생성 |

---

## 9. 워크플로우 선택 의사결정

```
정보가 필요하다?
├─ 내부 코드베이스? → deepcontext
├─ 공식 문서? → WF.DOCS_LADDER
├─ 업스트림 버그? → WF.GITHUB.UPSTREAM
├─ 웹 페이지? → WF.WEB_RESEARCH (동의 필요)
└─ 규칙 생성? → setup-rules.md
```

---

## 10. 핵심 설계 원칙

1. **Token Efficiency**: "Stop Early" - 충분하면 중단, MCP 호출 최대 4회/턴
2. **Consent-Gated**: 웹 크롤링/파일 수정은 명시적 동의 필수
3. **Source Hierarchy**: 내부코드 > 공식문서 > 업스트림 > 웹
4. **Mentorship**: 완성 코드 대신 구조와 힌트 제공, "왜" 설명
5. **Quality Gates**: 마크다운 검증, 시크릿 제외, 사용자 리뷰

---

## 11. 즉시 활용 팁

1. **다른 프로젝트에 적용**: `.claude/` + `.agent/` 폴더 복사
2. **스킬 호출**: `/code-review`, `/ddd-planning` 등 슬래시 명령어 사용
3. **규칙 설정**: `/setup-rules`로 프로젝트 규칙 자동 생성
4. **자동화 확인**: Kotlin 파일 수정 시 테스트 자동 실행 확인
5. **팀 공유**: 이 저장소를 팀 표준 설정으로 활용
