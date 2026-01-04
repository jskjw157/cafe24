---
description: URL을 Cafe24 스킨으로 변환하는 파이프라인 실행
argument-hint: [url]
---

# URL → Cafe24 스킨 변환

## 요청 정보

- **입력 URL**: $ARGUMENTS
- **대상**: Cafe24 스킨 템플릿 생성

## 파이프라인 실행

@tech-lead 에이전트를 호출하여 **url-to-cafe24** 파이프라인을 실행해주세요.

### 파이프라인 단계

1. **HTML 슬리밍** (필수 - Script-First)
   ```bash
   python3 script/url_to_cafe24_skin.py --url "$ARGUMENTS" --output-dir "output/skins"
   ```
   - 원본 HTML에서 불필요한 요소 제거 (script, style, data-*, class 등)
   - 토큰 절감: 평균 80-95%
   - 출력: `*_slimmed.html`, `*_analysis.json`

2. **문서 크롤링** (필요시)
   - @cafe24-api-crawler 에이전트 사용
   - 치환 코드 레퍼런스 확보: `doc/cafe24_api/design/replacement-codes.json`

3. **섹션 → 템플릿 변환**
   - @section-to-template 에이전트 사용
   - **슬림된 HTML** (`*_slimmed.html`)을 읽어서 Cafe24 템플릿으로 변환
   - `*_analysis.json`의 `cafe24_hints` 참조하여 모듈/치환코드 매핑
   - 치환 코드 삽입

4. **스킨 검증**
   - @cafe24-skin-validator 에이전트 사용
   - 치환 코드 문법 검증
   - 반응형 레이아웃 확인
   - 스크린샷 캡처

### 출력 위치

```
cafe24-skins/{domain}-{date}/
├── index.html
├── layout/
├── product/
├── css/
└── js/
```

## 완료 조건

- [ ] 필수 페이지 5개 이상 생성
- [ ] 치환 코드 100% 정상 렌더링
- [ ] 반응형 디자인 유지 (1440px, 768px, 375px)
