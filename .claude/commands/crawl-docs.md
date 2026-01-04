---
description: Cafe24 개발자 문서 크롤링 실행
---

# Cafe24 API 문서 크롤링

## 현재 상태

기존 문서 디렉토리 확인이 필요합니다.

## 크롤링 실행

@cafe24-api-crawler 에이전트를 사용하여 Cafe24 개발자 문서를 크롤링해주세요.

### 크롤링 대상

| 영역 | URL 패턴 | 우선순위 |
|------|----------|----------|
| REST API | `developers.cafe24.com/docs/api/*` | 🔴 필수 |
| 앱 개발 가이드 | `developers.cafe24.com/docs/app/*` | 🔴 필수 |
| 치환 코드 | `developers.cafe24.com/docs/design/replacement/*` | 🔴 필수 |
| 스킨 개발 | `developers.cafe24.com/docs/design/*` | 🟡 중요 |

### 출력 디렉토리

```
doc/cafe24_api/
├── api/
│   ├── admin/
│   │   ├── products.json
│   │   ├── orders.json
│   │   └── members.json
│   └── front/
├── design/
│   ├── skin-structure.md
│   ├── replacement-codes.json  ← 핵심!
│   └── modules.md
├── app/
│   ├── oauth.md
│   └── webhooks.md
└── index.json
```

### 스크립트 우선 원칙

가능하면 크롤링 스크립트를 사용해주세요:

```bash
python script/cafe24_doc_crawler.py \
  --base-url "https://developers.cafe24.com" \
  --output-dir "doc/cafe24_api" \
  --format json+md
```

## 완료 조건

- [ ] API 엔드포인트 100% 문서화
- [ ] 치환 코드 전체 수집 및 분류
- [ ] 검색 가능한 index.json 생성
- [ ] AI 에이전트용 요약본 생성
