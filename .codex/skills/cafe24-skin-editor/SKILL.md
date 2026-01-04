---
name: cafe24-skin-editor
description: |
  Cafe24 스킨/템플릿 수정 전문 스킬. 레이아웃/헤더/푸터/상품/회원 등 템플릿 파일 위치 파악과 안전한 수정 절차를 안내한다.
  사용 시기: (1) 스킨/템플릿 수정 요청 (2) layout/header/footer 변경 (3) css/js 추가 또는 경로 수정 (4) PC/모바일/스킨 간 변경사항 동기화가 필요할 때 (project)
---

# Cafe24 Skin Editor

Cafe24 스킨 템플릿을 안전하게 수정하고, 적용 범위를 명확히 관리한다.

## Quick Workflow

1. 대상 스킨 범위를 확인한다: `skin1`~`skin5`, `base`, `baseFront`, `mobile*` 중 어디에 적용할지 먼저 합의한다.
2. 레이아웃 진입점을 찾는다: 보통 `layout/basic/layout.html`에서 헤더/푸터/본문 구성을 관리한다.
3. 해당 영역 파일을 찾는다: `layout/basic/header.html`, `layout/basic/footer.html`, `layout/basic/sidebar.html` 등으로 분기된다.
4. 템플릿에서 대상 요소를 찾는다: 클래스/ID/모듈 속성/치환코드로 검색한다.
5. Cafe24 지시어를 유지한 채 편집한다: `<!--@css-->`, `<!--@js-->`, `<!--@import-->`, `<!--@contents-->`는 삭제하지 않는다.
6. 변경 범위를 기록하고, 동일 변경이 필요한 스킨에 반복 적용한다.

## Repo Map (자주 쓰는 폴더)

- `layout/`: 헤더/푸터/페이지 골격
- `css/`: 공통/레이아웃/컴포넌트 스타일
- `js/`: 공통 스크립트와 모듈
- `product/`, `member/`, `order/`, `board/`, `myshop/`, `shopinfo/`: 기능별 템플릿
- `smart-banner/`, `svg/`, `ez/`: 특수 기능/리소스

## Cafe24 템플릿 규칙

- `<!--@css(/path/to/file.css)-->`와 `<!--@js(/path/to/file.js)-->`는 레이아웃에서 로딩 순서를 유지한다.
- `<!--@import(/path/to/partial.html)-->`는 파셜 연결이므로 삭제/경로 변경 시 영향 범위를 먼저 확인한다.
- `<!--@contents-->`는 페이지 본문 슬롯이므로 제거하지 않는다.
- `module="..."` 속성과 `{$...}` 치환코드는 동작 로직이므로 유지한다.

## 탐색 명령 예시

```bash
# 스킨 내 특정 클래스/ID 검색
rg -n "header|footer|gnb|logo" skin5

# 모듈/치환코드 위치 찾기
rg -n "module=\"" skin5
rg -n "\{\$" skin5

# 레이아웃 파일 위치 확인
rg --files -g "*.html" skin5/layout
```

## 체크리스트

- 대상 스킨 범위를 확인했는가?
- 변경이 필요한 템플릿 파일을 정확히 찾았는가?
- Cafe24 지시어/치환코드를 보존했는가?
- 동일 변경이 필요한 스킨/모바일 폴더에 반영했는가?
- 변경 범위를 간단히 정리했는가?
