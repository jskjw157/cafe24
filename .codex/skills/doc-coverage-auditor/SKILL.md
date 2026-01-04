---
name: doc-coverage-auditor
description: |
  코드 문서화 누락 점검 스킬. script/doc_analyzer.py로 함수/클래스 문서화 커버리지를 분석하고 리포트를 만든다.
  사용 시기: (1) 문서화 품질 점검 요청 시 (2) 리팩터링 후 문서화 누락 확인 (3) 릴리즈 전 점검 (4) /doc-coverage 호출 시 (project)
---

# Doc Coverage Auditor

코드 문서화 커버리지를 계산하고 누락 항목을 JSON 리포트로 남긴다.

## Quick Start

```bash
python3 script/doc_analyzer.py --target . --output .claude/doc-report.json
```

## 사용 팁

- 분석 대상 폴더를 좁히면 결과가 더 명확해진다.
- 리포트의 `missing` 리스트를 우선순위(critical/important)부터 처리한다.

## 출력 요약

- `summary.doc_coverage`: 전체 문서화 커버리지(%)
- `missing`: 누락 항목 목록 (파일, 라인, 타입, 우선순위)
