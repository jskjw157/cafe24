---
description: 디자인 라이브러리 문서 크롤링 (Tailwind, Iconify, Framer Motion, Radix Colors)
---

# 디자인 라이브러리 문서 크롤링

## 크롤링 대상

| 라이브러리 | 용도 | 우선순위 |
|------------|------|----------|
| Tailwind CSS | 유틸리티 CSS | 🔴 필수 |
| Iconify | 아이콘 컴포넌트 | 🔴 필수 |
| Framer Motion | 애니메이션 | 🟡 중요 |
| Radix Colors | 컬러 시스템 | 🟡 중요 |

## 실행

### 전체 크롤링

```bash
python script/design_docs_crawler.py \
  --target all \
  --output doc/design_libs \
  --format json+md
```

### 개별 크롤링

```bash
# Tailwind CSS만
python script/design_docs_crawler.py --target tailwind

# Framer Motion만
python script/design_docs_crawler.py --target framer-motion

# 여러 개 선택
python script/design_docs_crawler.py --target tailwind,iconify
```

## 출력 구조

```
doc/design_libs/
├── index.json                    ← 전체 인덱스
├── tailwind/
│   ├── ai-summary.json           ← AI 에이전트용 요약 (핵심!)
│   ├── full.json                 ← 전체 데이터
│   └── reference.md              ← 마크다운 레퍼런스
├── iconify/
│   ├── ai-summary.json
│   ├── full.json
│   └── reference.md
├── framer-motion/
│   ├── ai-summary.json
│   ├── full.json
│   └── reference.md
└── radix-colors/
    ├── ai-summary.json
    ├── full.json
    └── reference.md
```

## AI 에이전트 활용

크롤링 후 디자인 작업 시:

1. **컬러 찾기**: `doc/design_libs/radix-colors/ai-summary.json` 읽기
2. **애니메이션 코드**: `doc/design_libs/framer-motion/ai-summary.json` 읽기
3. **유틸리티 클래스**: `doc/design_libs/tailwind/ai-summary.json` 읽기
4. **아이콘 사용법**: `doc/design_libs/iconify/ai-summary.json` 읽기

## ai-summary.json 구조

```json
{
  "library": "Tailwind CSS",
  "quick_reference": {
    "sections": ["Installation", "Configuration", ...],
    "key_topics": ["utility-first", "responsive", "dark-mode", ...],
    "code_languages": ["bash", "css", "html", "javascript"]
  },
  "code_snippets": {
    "bash": ["npm install tailwindcss...", ...],
    "css": ["@import 'tailwindcss';", ...]
  },
  "urls": ["https://tailwindcss.com/docs/..."]
}
```

## 의존성

```bash
pip install requests beautifulsoup4 lxml
```

## 크롤링 주기

- 라이브러리 메이저 업데이트 시
- 월 1회 정기 업데이트 권장
- 새 프로젝트 시작 시 최신화
