---
name: codebase-merger
description: |
  코드베이스 병합 스킬. script/code_merger.py로 프로젝트 파일을 하나의 텍스트로 합쳐 분석/검색용으로 활용한다.
  사용 시기: (1) 대규모 코드 요약/분석 준비 (2) 특정 확장자만 병합 (3) LLM 입력용 단일 파일 생성 (4) /merge-codebase 호출 시 (project)
---

# Codebase Merger

코드베이스를 단일 텍스트 파일로 병합한다.

## Quick Start

```bash
python3 script/code_merger.py --project-root . --output merged_code.txt
```

## 자주 쓰는 옵션

```bash
# 특정 확장자만 병합
python3 script/code_merger.py --project-root . --ext .html .css .js --output merged_frontend.txt

# 특정 폴더만 포함
python3 script/code_merger.py --project-root . --include "skin5/**/*.html" --output merged_skin5.txt

# 추가 제외 패턴 지정
python3 script/code_merger.py --project-root . --exclude ".claude" --exclude "doc" --output merged_code.txt
```

## 주의사항

- 대용량 파일은 기본적으로 제외되므로 필요 시 `--max-size`를 조정한다.
- 민감한 정보가 포함된 파일은 `--exclude`로 제외한다.
