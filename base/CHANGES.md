# Atelier Popo 디자인 적용 변경 사항

## 수정된 파일 목록

### 1. 레이아웃 파일

-   `layout/basic/layout.html` - 폰트 및 아이콘 CDN 추가
-   `layout/basic/header.html` - 로고 텍스트 및 아이콘 변경
-   `layout/basic/footer.html` - 로고 텍스트, SNS 아이콘, 하단 네비게이션 변경

### 2. CSS 파일

-   `layout/basic/css/common.css` - CSS 변수 정의, 폰트 설정
-   `layout/basic/css/layout.css` - 헤더, 푸터, 네비게이션 스타일링
-   `layout/basic/css/main.css` - 메인 페이지 섹션 스타일링
-   `layout/basic/css/ec-base-product.css` - 상품 카드 디자인
-   `layout/basic/css/ec-base-button.css` - 버튼 스타일 통일
-   `layout/basic/css/sub_style.css` - 서브 페이지 요소 스타일링

## 디자인 시스템

### 색상

-   **브랜드 핑크**: `#ec4899` (주 색상)
-   **핑크 다크**: `#db2777` (호버 상태)
-   **핑크 라이트**: `#ff6b9d` (강조)
-   **그레이 팔레트**: 50~900 단계

### 타이포그래피

-   **브랜드 폰트**: Pacifico (로고 및 제목)
-   **본문 폰트**: Inter (본문 및 UI)

### 아이콘

-   **Remix Icon**: 20~24px 크기

### 스타일 특징

-   **둥근 모서리**: 8~16px border-radius
-   **그림자**: 레이어드 효과
-   **호버 효과**: translateY, scale, 색상 변화
-   **반투명 배경**: backdrop-filter blur

## 로컬 테스트 방법

1. **정적 서버 실행**:

    ```bash
    cd base
    python -m http.server 8000
    ```

    브라우저에서 http://localhost:8000 접속

2. **제한사항**:
    - Cafe24 템플릿 변수는 작동하지 않음
    - 동적 기능 (상품, 장바구니 등) 미작동
    - 디자인과 레이아웃만 확인 가능

## Cafe24 업로드 방법

1. FTP 클라이언트로 `/base/` 폴더 연결
2. 수정된 파일 업로드
3. Cafe24 관리자 > 스마트 디자인 > 미리보기
4. 확인 후 적용

## 주의사항

-   **EZ 모듈**: `data-ez-*` 속성은 유지됨 (관리자 페이지에서 편집 가능)
-   **템플릿 문법**: `{$variable}`, `module=""`, `<!--@import()-->` 유지
-   **반응형**: PC, 태블릿, 모바일 모두 고려됨
