---
description: 아이디어를 Cafe24 앱스토어 앱으로 변환
argument-hint: [idea or benchmark-url]
---

# 아이디어 → Cafe24 앱 생성

## 요청 정보

$ARGUMENTS

## 파이프라인 실행

@tech-lead 에이전트를 호출하여 **idea-to-app** (또는 **benchmark-to-app**) 파이프라인을 실행해주세요.

### 입력 유형 판단

1. **아이디어 기반**: 자연어 설명이면 `idea-to-app` 파이프라인
2. **벤치마킹 기반**: URL이 포함되면 `benchmark-to-app` 파이프라인

### 파이프라인 단계

#### 아이디어 기반 (idea-to-app)

1. **요구사항 분석** - @app-requirement-analyzer
   - 기능 목록 추출
   - Cafe24 API 권한 식별 (`doc/cafe24_api/` 참조)
   - 아키텍처 초안

2. **OAuth 모듈 생성** - @cafe24-oauth-generator
   - OAuth 2.0 인증 플로우
   - 토큰 관리
   - API 클라이언트

3. **비즈니스 로직 구현** (추후)

#### 벤치마킹 기반 (benchmark-to-app)

1. **앱스토어 분석** - 기능 역공학
2. **차별화 포인트 식별**
3. 이후 idea-to-app과 동일

### 출력 위치

```
apps/{app-name}/
├── auth/
│   ├── oauth.py
│   ├── token_manager.py
│   └── cafe24_client.py
├── webhooks/
├── config/
└── requirements.txt
```

## 완료 조건

- [ ] requirements.json 생성
- [ ] OAuth 모듈 동작 확인
- [ ] Cafe24 API 호출 테스트
