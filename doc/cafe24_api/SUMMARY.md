# Cafe24 API & 스킨 개발 요약

## 개요

이 문서는 AI 에이전트가 Cafe24 쇼핑몰 개발에 활용할 수 있는 핵심 정보를 담고 있습니다.

## API 개요

### Admin API
- **인증**: OAuth 2.0
- **기본 URL**: `https://{mall_id}.cafe24api.com/api/v2/admin`
- **주요 리소스**: Products, Orders, Customers, Categories, Coupons

### Front API
- **인증**: client_id만 필요
- **기본 URL**: `https://{mall_id}.cafe24api.com/api/v2/front`
- **용도**: 공개 상품 정보, 고객 자기 정보 조회

## 치환코드 요약

### 상품 이미지 (메인/목록 페이지)
| 변수 | 설명 |
|------|------|
| `{$image_big}` | 대표 이미지 |
| `{$image_medium}` | 중간 이미지 |
| `{$image_tiny}` | 축소 이미지 |
| `{$image_small}` | 썸네일 |

### 상품 이미지 (상세 페이지)
| 변수 | 설명 |
|------|------|
| `{$big_img}` | 대표 이미지 |
| `{$medium_img}` | 중간 이미지 |
| `{$tiny_img}` | 축소 이미지 |
| `{$small_img}` | 썸네일 |

### 핵심 상품 정보
| 변수 | 설명 |
|------|------|
| `{$product_name}` | 상품명 |
| `{$product_price}` | 판매가 |
| `{$product_no}` | 상품 번호 |
| `{$prd_detail}` | 상세 설명 (HTML) |

## 모듈 시스템

치환코드는 반드시 해당 모듈 안에서 사용해야 합니다:

| 모듈 | 용도 | 사용 가능 변수 |
|------|------|---------------|
| `product_listmain` | 메인 상품 목록 | `{$image_big}`, `{$product_name}` |
| `product_detail` | 상품 상세 | `{$big_img}`, `{$product_name}` |
| `Layout_category` | 카테고리 메뉴 | `{$link_product_list}` |

## 참고 링크

- [Admin API 문서](https://developers.cafe24.com/docs/en/api/)
- [스마트디자인 서포트](https://sdsupport.cafe24.com)
- [치환코드 가이드](https://sdsupport.cafe24.com/board/tip/read.html?no=401&board_no=6)
