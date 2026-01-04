---
name: claude-config-validator
description: |
  .claude/ 설정 파일 자동 검증 스킬. script/config_validator.py로 에이전트/스킬/훅/룰 구조와 frontmatter 유효성을 검사한다.
  사용 시기: (1) .claude 설정 추가/수정 직후 (2) 에러 원인 파악이 필요할 때 (3) 릴리즈/공유 전 점검 (4) /validate-config 호출 시 (project)
---

# Claude Config Validator

`.claude/` 설정을 스크립트로 자동 검증하고 JSON 리포트를 생성한다.

## Quick Start

```bash
python3 script/config_validator.py --target .claude --output .claude/config-report.json
```

## 세부 사용법

```bash
# 특정 스킬만 검증
python3 script/config_validator.py --target .claude/skills/<skill-name>

# 특정 에이전트 파일 검증
python3 script/config_validator.py --target .claude/agents/<agent>.md
```

## 결과 해석

- `errors`: 필수 필드 누락, 잘못된 frontmatter 등 치명적 문제
- `warnings`: 권장 패턴 불일치, 네이밍 규칙 불일치 등 개선 필요 항목
- `summary`: 카테고리별 유효/무효 통계

## 주의사항

- `name`과 디렉토리명이 일치하는지 확인한다.
- SKILL.md 본문이 비어 있으면 경고가 발생한다.
