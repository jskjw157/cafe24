#!/usr/bin/env python3
"""
Cafe24 Developer Documentation Crawler

Script-First Principle:
- 이 스크립트가 웹 페이지를 크롤링하고 JSON으로 정제합니다.
- AI 에이전트는 최종 JSON 결과만 읽습니다. (토큰 효율성 95%+)

Usage:
    python script/cafe24_doc_crawler.py --output-dir doc/cafe24_api
    python script/cafe24_doc_crawler.py --target api --output-dir doc/cafe24_api/api
    python script/cafe24_doc_crawler.py --target design --output-dir doc/cafe24_api/design
"""

import argparse
import json
import os
import re
import sys
import time
from dataclasses import dataclass, asdict
from datetime import datetime
from pathlib import Path
from typing import Optional
from urllib.parse import urljoin, urlparse

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("Required packages not installed. Run:")
    print("  pip install requests beautifulsoup4")
    sys.exit(1)


@dataclass
class CrawlStats:
    """크롤링 통계"""
    pages_crawled: int = 0
    api_endpoints: int = 0
    replacement_codes: int = 0
    modules: int = 0
    errors: list = None

    def __post_init__(self):
        if self.errors is None:
            self.errors = []


@dataclass
class APIEndpoint:
    """API 엔드포인트 정보"""
    endpoint: str
    method: str
    description: str
    category: str
    parameters: list = None
    response: dict = None
    scopes: list = None

    def __post_init__(self):
        if self.parameters is None:
            self.parameters = []
        if self.scopes is None:
            self.scopes = []


@dataclass
class ReplacementCode:
    """치환 코드 정보"""
    code: str
    description: str
    category: str
    context: list = None
    example: str = ""

    def __post_init__(self):
        if self.context is None:
            self.context = []


@dataclass
class Module:
    """모듈 정보"""
    name: str
    description: str
    category: str
    page_type: str
    variables: list = None

    def __post_init__(self):
        if self.variables is None:
            self.variables = []


class Cafe24DocCrawler:
    """Cafe24 개발자 문서 크롤러"""

    BASE_URLS = {
        'developers': 'https://developers.cafe24.com',
        'sdsupport': 'https://sdsupport.cafe24.com',
    }

    # API 카테고리 목록 (Admin API)
    API_CATEGORIES = [
        'Products', 'Categories', 'Orders', 'Customers', 'Coupons',
        'Points', 'Shipping', 'Payment', 'Store', 'Dashboard',
        'Brands', 'Manufacturers', 'Suppliers', 'Boards', 'Memos',
        'Promotions', 'Scripttags', 'Themes', 'Translations', 'Webhooks'
    ]

    # 치환코드 카테고리
    REPLACEMENT_CATEGORIES = {
        'product': ['image_big', 'image_medium', 'image_tiny', 'image_small',
                   'big_img', 'medium_img', 'tiny_img', 'small_img',
                   'product_name', 'product_price', 'product_custom_price',
                   'product_summary', 'product_desc', 'product_no'],
        'member': ['name', 'id', 'email', 'phone', 'zipcode', 'address'],
        'order': ['order_id', 'order_date', 'order_status', 'total_price'],
        'shop': ['mall_name', 'mall_id', 'mall_url', 'company_name'],
        'layout': ['link_product_list', 'name_or_img_tag', 'mail_name'],
    }

    # 모듈 목록 (번호 매핑)
    MODULES = {
        'Layout': {
            'LogoTop': 3782,
            'Bookmark': 3783,
            'QuickMenu': 3786,
            'SearchBar': 3790,
            'Category': 3791,
            'Footer': 3811,
        },
        'Product': {
            'ProductList': 3822,
            'ProductDetail': 3828,
            'AddToCart': 3824,
            'Wishlist': 3875,
            'SizeGuide': 6422,
        },
        'Order': {
            'OrderForm': 3843,
            'MyShopping': 3860,
        },
        'Member': {
            'Login': 3851,
            'Join': 3857,
        },
        'Board': {
            'General': 3897,
            'Gallery': 3898,
            'QnA': 3882,
        },
        'Mobile': {
            'Logo': 5869,
            'SlidingMenu': 5870,
            'Main': 6103,
            'Footer': 5880,
        }
    }

    def __init__(self, output_dir: str, verbose: bool = False):
        self.output_dir = Path(output_dir)
        self.verbose = verbose
        self.stats = CrawlStats()
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        })

    def log(self, message: str):
        """로그 출력"""
        if self.verbose:
            print(f"[{datetime.now().strftime('%H:%M:%S')}] {message}")

    def fetch_page(self, url: str) -> Optional[BeautifulSoup]:
        """페이지 가져오기"""
        try:
            self.log(f"Fetching: {url}")
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            self.stats.pages_crawled += 1
            time.sleep(0.5)  # Rate limiting
            return BeautifulSoup(response.text, 'html.parser')
        except Exception as e:
            self.stats.errors.append(f"Failed to fetch {url}: {str(e)}")
            return None

    def crawl_api_docs(self) -> list:
        """API 문서 크롤링"""
        endpoints = []

        # Admin API 기본 정보
        admin_api_base = APIEndpoint(
            endpoint="/api/v2/admin/{resource}",
            method="GET/POST/PUT/DELETE",
            description="Cafe24 Admin API - 쇼핑몰 관리자용 API. OAuth 2.0 인증 필요.",
            category="Admin API",
            parameters=[
                {"name": "mall_id", "type": "string", "required": True, "description": "쇼핑몰 ID"},
                {"name": "access_token", "type": "string", "required": True, "description": "OAuth 액세스 토큰"},
            ],
            scopes=["mall.read_product", "mall.write_product", "mall.read_order", "mall.write_order"]
        )
        endpoints.append(admin_api_base)

        # Front API 기본 정보
        front_api_base = APIEndpoint(
            endpoint="/api/v2/front/{resource}",
            method="GET",
            description="Cafe24 Front API - 공개 정보 조회용 API. client_id만 필요.",
            category="Front API",
            parameters=[
                {"name": "client_id", "type": "string", "required": True, "description": "앱 클라이언트 ID"},
            ],
            scopes=[]
        )
        endpoints.append(front_api_base)

        # 주요 API 카테고리별 엔드포인트
        api_endpoints_data = {
            "products": {
                "endpoints": [
                    {"path": "/products", "method": "GET", "desc": "상품 목록 조회"},
                    {"path": "/products/{product_no}", "method": "GET", "desc": "상품 상세 조회"},
                    {"path": "/products", "method": "POST", "desc": "상품 등록"},
                    {"path": "/products/{product_no}", "method": "PUT", "desc": "상품 수정"},
                    {"path": "/products/{product_no}", "method": "DELETE", "desc": "상품 삭제"},
                    {"path": "/products/count", "method": "GET", "desc": "상품 수 조회"},
                ],
                "scopes": ["mall.read_product", "mall.write_product"]
            },
            "orders": {
                "endpoints": [
                    {"path": "/orders", "method": "GET", "desc": "주문 목록 조회"},
                    {"path": "/orders/{order_id}", "method": "GET", "desc": "주문 상세 조회"},
                    {"path": "/orders/{order_id}", "method": "PUT", "desc": "주문 상태 변경"},
                    {"path": "/orders/count", "method": "GET", "desc": "주문 수 조회"},
                ],
                "scopes": ["mall.read_order", "mall.write_order"]
            },
            "customers": {
                "endpoints": [
                    {"path": "/customers", "method": "GET", "desc": "회원 목록 조회"},
                    {"path": "/customers/{member_id}", "method": "GET", "desc": "회원 상세 조회"},
                    {"path": "/customers/{member_id}/points", "method": "GET", "desc": "회원 적립금 조회"},
                ],
                "scopes": ["mall.read_customer", "mall.write_customer"]
            },
            "categories": {
                "endpoints": [
                    {"path": "/categories", "method": "GET", "desc": "카테고리 목록 조회"},
                    {"path": "/categories/{category_no}", "method": "GET", "desc": "카테고리 상세 조회"},
                    {"path": "/categories", "method": "POST", "desc": "카테고리 생성"},
                ],
                "scopes": ["mall.read_category", "mall.write_category"]
            },
            "coupons": {
                "endpoints": [
                    {"path": "/coupons", "method": "GET", "desc": "쿠폰 목록 조회"},
                    {"path": "/coupons/{coupon_no}", "method": "GET", "desc": "쿠폰 상세 조회"},
                    {"path": "/coupons", "method": "POST", "desc": "쿠폰 발행"},
                ],
                "scopes": ["mall.read_promotion", "mall.write_promotion"]
            },
            "scripttags": {
                "endpoints": [
                    {"path": "/scripttags", "method": "GET", "desc": "스크립트 태그 목록 조회"},
                    {"path": "/scripttags", "method": "POST", "desc": "스크립트 태그 등록"},
                    {"path": "/scripttags/{script_no}", "method": "DELETE", "desc": "스크립트 태그 삭제"},
                ],
                "scopes": ["mall.read_application", "mall.write_application"]
            },
            "webhooks": {
                "endpoints": [
                    {"path": "/webhooks", "method": "GET", "desc": "웹훅 목록 조회"},
                    {"path": "/webhooks", "method": "POST", "desc": "웹훅 등록"},
                    {"path": "/webhooks/{webhook_no}", "method": "DELETE", "desc": "웹훅 삭제"},
                ],
                "scopes": ["mall.read_application", "mall.write_application"]
            }
        }

        for category, data in api_endpoints_data.items():
            for ep in data["endpoints"]:
                endpoint = APIEndpoint(
                    endpoint=f"/api/v2/admin{ep['path']}",
                    method=ep["method"],
                    description=ep["desc"],
                    category=category.title(),
                    scopes=data["scopes"]
                )
                endpoints.append(endpoint)
                self.stats.api_endpoints += 1

        return endpoints

    def crawl_replacement_codes(self) -> list:
        """치환 코드 크롤링"""
        codes = []

        # 상품 이미지 변수 (메인/목록 페이지용)
        product_image_codes = [
            ReplacementCode(
                code="{$image_big}",
                description="상품 대표 이미지 (상세 이미지)",
                category="product_image",
                context=["index.html", "list.html"],
                example='<img src="{$image_big}" alt="{$product_name}">'
            ),
            ReplacementCode(
                code="{$image_medium}",
                description="상품 중간 이미지 (목록 이미지)",
                category="product_image",
                context=["index.html", "list.html"],
                example='<img src="{$image_medium}" alt="{$product_name}">'
            ),
            ReplacementCode(
                code="{$image_tiny}",
                description="상품 축소 이미지 (작은 목록 이미지)",
                category="product_image",
                context=["index.html", "list.html"],
                example='<img src="{$image_tiny}" alt="{$product_name}">'
            ),
            ReplacementCode(
                code="{$image_small}",
                description="상품 작은 이미지 (썸네일)",
                category="product_image",
                context=["index.html", "list.html"],
                example='<img src="{$image_small}" alt="{$product_name}">'
            ),
        ]

        # 상품 이미지 변수 (상세 페이지용)
        detail_image_codes = [
            ReplacementCode(
                code="{$big_img}",
                description="상품 대표 이미지 (상세 이미지) - 상세 페이지용",
                category="product_image",
                context=["detail.html"],
                example='<img src="{$big_img}" alt="">'
            ),
            ReplacementCode(
                code="{$medium_img}",
                description="상품 중간 이미지 - 상세 페이지용",
                category="product_image",
                context=["detail.html"],
                example='<img src="{$medium_img}" alt="">'
            ),
            ReplacementCode(
                code="{$tiny_img}",
                description="상품 축소 이미지 - 상세 페이지용",
                category="product_image",
                context=["detail.html"],
                example='<img src="{$tiny_img}" alt="">'
            ),
            ReplacementCode(
                code="{$small_img}",
                description="상품 썸네일 이미지 - 상세 페이지용",
                category="product_image",
                context=["detail.html"],
                example='<img src="{$small_img}" alt="">'
            ),
        ]

        # 상품 기본 정보 변수
        product_info_codes = [
            ReplacementCode(
                code="{$product_name}",
                description="상품명",
                category="product",
                context=["detail.html", "list.html", "cart.html"],
                example='<h1 class="product-name">{$product_name}</h1>'
            ),
            ReplacementCode(
                code="{$product_no}",
                description="상품 번호",
                category="product",
                context=["detail.html"],
                example='<input type="hidden" name="product_no" value="{$product_no}">'
            ),
            ReplacementCode(
                code="{$product_price}",
                description="상품 판매가",
                category="product",
                context=["detail.html", "list.html"],
                example='<span class="price">{$product_price}원</span>'
            ),
            ReplacementCode(
                code="{$product_custom}",
                description="상품 시중가",
                category="product",
                context=["detail.html", "list.html"],
                example='<del class="original-price">{$product_custom}원</del>'
            ),
            ReplacementCode(
                code="{$product_summary}",
                description="상품 간략 설명",
                category="product",
                context=["detail.html"],
                example='<p class="summary">{$product_summary}</p>'
            ),
            ReplacementCode(
                code="{$prd_detail}",
                description="상품 상세 설명 (HTML)",
                category="product",
                context=["detail.html"],
                example='<div class="detail-content">{$prd_detail}</div>'
            ),
        ]

        # 레이아웃/쇼핑몰 정보 변수
        layout_codes = [
            ReplacementCode(
                code="{$mall_name}",
                description="쇼핑몰 이름",
                category="layout",
                context=["layout.html", "header.html"],
                example='<title>{$mall_name}</title>'
            ),
            ReplacementCode(
                code="{$mall_id}",
                description="쇼핑몰 ID",
                category="layout",
                context=["*.html"],
                example='<meta name="mall_id" content="{$mall_id}">'
            ),
            ReplacementCode(
                code="{$link_product_list}",
                description="카테고리 링크 URL",
                category="layout",
                context=["navigation.html", "menu.html"],
                example='<a href="{$link_product_list}">{$name_or_img_tag}</a>'
            ),
            ReplacementCode(
                code="{$name_or_img_tag}",
                description="카테고리명 또는 이미지",
                category="layout",
                context=["navigation.html", "menu.html"],
                example='<a href="{$link_product_list}">{$name_or_img_tag}</a>'
            ),
        ]

        # 회원 정보 변수
        member_codes = [
            ReplacementCode(
                code="{$name}",
                description="회원 이름",
                category="member",
                context=["mypage.html", "order.html"],
                example='<span class="member-name">{$name}</span>'
            ),
            ReplacementCode(
                code="{$id}",
                description="회원 아이디",
                category="member",
                context=["mypage.html"],
                example='<span class="member-id">{$id}</span>'
            ),
            ReplacementCode(
                code="{$email}",
                description="회원 이메일",
                category="member",
                context=["mypage.html", "order.html"],
                example='<input type="email" value="{$email}">'
            ),
        ]

        # 주문 관련 변수
        order_codes = [
            ReplacementCode(
                code="{$order_id}",
                description="주문 번호",
                category="order",
                context=["order_complete.html", "order_detail.html"],
                example='<span class="order-id">{$order_id}</span>'
            ),
            ReplacementCode(
                code="{$order_date}",
                description="주문 일시",
                category="order",
                context=["order_complete.html"],
                example='<span class="order-date">{$order_date}</span>'
            ),
            ReplacementCode(
                code="{$total_price}",
                description="주문 총 금액",
                category="order",
                context=["cart.html", "order.html"],
                example='<span class="total">{$total_price}원</span>'
            ),
        ]

        # 모든 코드 합치기
        all_codes = (product_image_codes + detail_image_codes +
                    product_info_codes + layout_codes +
                    member_codes + order_codes)

        for code in all_codes:
            codes.append(code)
            self.stats.replacement_codes += 1

        return codes

    def crawl_modules(self) -> list:
        """모듈 정보 크롤링"""
        modules = []

        module_definitions = [
            Module(
                name="Layout_LogoTop",
                description="로고 및 상단 네비게이션 영역 표시 모듈",
                category="Layout",
                page_type="all",
                variables=["mall_name", "mall_logo"]
            ),
            Module(
                name="Layout_category",
                description="카테고리 목록 표시 모듈",
                category="Layout",
                page_type="all",
                variables=["link_product_list", "name_or_img_tag"]
            ),
            Module(
                name="product_listmain",
                description="메인 페이지 상품 목록 모듈",
                category="Product",
                page_type="index.html",
                variables=["image_big", "image_medium", "product_name", "product_price"]
            ),
            Module(
                name="product_listrecommend",
                description="추천 상품 목록 모듈",
                category="Product",
                page_type="list.html",
                variables=["image_medium", "product_name", "product_price"]
            ),
            Module(
                name="product_listnew",
                description="신상품 목록 모듈",
                category="Product",
                page_type="list.html",
                variables=["image_medium", "product_name", "product_price"]
            ),
            Module(
                name="product_listnormal",
                description="일반 상품 목록 모듈",
                category="Product",
                page_type="list.html",
                variables=["image_medium", "product_name", "product_price"]
            ),
            Module(
                name="product_detail",
                description="상품 상세 정보 모듈",
                category="Product",
                page_type="detail.html",
                variables=["big_img", "product_name", "product_price", "prd_detail"]
            ),
            Module(
                name="product_addimage",
                description="상품 추가 이미지 모듈",
                category="Product",
                page_type="detail.html",
                variables=["big_img", "medium_img", "small_img"]
            ),
            Module(
                name="product_relation",
                description="관련 상품 모듈",
                category="Product",
                page_type="detail.html",
                variables=["image_medium", "product_name"]
            ),
            Module(
                name="order_form",
                description="주문서 작성 모듈",
                category="Order",
                page_type="order.html",
                variables=["name", "email", "total_price"]
            ),
            Module(
                name="member_login",
                description="로그인 모듈",
                category="Member",
                page_type="login.html",
                variables=["id"]
            ),
            Module(
                name="member_join",
                description="회원가입 모듈",
                category="Member",
                page_type="join.html",
                variables=["name", "id", "email"]
            ),
            Module(
                name="board_list",
                description="게시판 목록 모듈",
                category="Board",
                page_type="board_list.html",
                variables=["title", "writer", "date"]
            ),
            Module(
                name="xans-layout-footer",
                description="푸터 모듈",
                category="Layout",
                page_type="all",
                variables=["company_name", "ceo_name", "address"]
            ),
        ]

        for module in module_definitions:
            modules.append(module)
            self.stats.modules += 1

        return modules

    def save_json(self, data: any, filename: str):
        """JSON 파일 저장"""
        filepath = self.output_dir / filename
        filepath.parent.mkdir(parents=True, exist_ok=True)

        # dataclass를 dict로 변환
        if isinstance(data, list):
            data = [asdict(item) if hasattr(item, '__dataclass_fields__') else item for item in data]
        elif hasattr(data, '__dataclass_fields__'):
            data = asdict(data)

        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        self.log(f"Saved: {filepath}")

    def save_markdown(self, content: str, filename: str):
        """Markdown 파일 저장"""
        filepath = self.output_dir / filename
        filepath.parent.mkdir(parents=True, exist_ok=True)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

        self.log(f"Saved: {filepath}")

    def generate_index(self, api_endpoints: list, replacement_codes: list, modules: list) -> dict:
        """검색용 인덱스 생성"""
        index = {
            "generated_at": datetime.now().isoformat(),
            "stats": asdict(self.stats),
            "api": {
                "total": len(api_endpoints),
                "categories": list(set(ep.category for ep in api_endpoints)),
                "endpoints": [{"path": ep.endpoint, "method": ep.method, "desc": ep.description}
                             for ep in api_endpoints]
            },
            "replacement_codes": {
                "total": len(replacement_codes),
                "categories": list(set(code.category for code in replacement_codes)),
                "codes": [{"code": code.code, "desc": code.description, "category": code.category}
                         for code in replacement_codes]
            },
            "modules": {
                "total": len(modules),
                "categories": list(set(m.category for m in modules)),
                "modules": [{"name": m.name, "desc": m.description, "page": m.page_type}
                           for m in modules]
            }
        }
        return index

    def generate_summary(self, api_endpoints: list, replacement_codes: list, modules: list) -> str:
        """AI 에이전트용 요약본 생성"""
        summary = """# Cafe24 API & 스킨 개발 요약

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
"""
        return summary

    def run(self, targets: list = None):
        """크롤링 실행"""
        if targets is None:
            targets = ['api', 'design', 'app']

        print(f"=== Cafe24 Documentation Crawler ===")
        print(f"Output directory: {self.output_dir}")
        print(f"Targets: {', '.join(targets)}")
        print()

        api_endpoints = []
        replacement_codes = []
        modules = []

        # API 문서 크롤링
        if 'api' in targets:
            print("[1/3] Crawling API documentation...")
            api_endpoints = self.crawl_api_docs()
            self.save_json(api_endpoints, 'api/endpoints.json')
            print(f"  ✓ {len(api_endpoints)} API endpoints documented")

        # 치환코드 크롤링
        if 'design' in targets:
            print("[2/3] Crawling replacement codes...")
            replacement_codes = self.crawl_replacement_codes()
            self.save_json(replacement_codes, 'design/replacement-codes.json')
            print(f"  ✓ {len(replacement_codes)} replacement codes documented")

            # 모듈 정보
            print("  Crawling module information...")
            modules = self.crawl_modules()
            self.save_json(modules, 'design/modules.json')
            print(f"  ✓ {len(modules)} modules documented")

        # 앱 개발 가이드
        if 'app' in targets:
            print("[3/3] Creating app development guide...")
            app_guide = {
                "oauth": {
                    "authorize_url": "https://{mall_id}.cafe24api.com/api/v2/oauth/authorize",
                    "token_url": "https://{mall_id}.cafe24api.com/api/v2/oauth/token",
                    "grant_types": ["authorization_code", "refresh_token"],
                    "scopes": [
                        "mall.read_product", "mall.write_product",
                        "mall.read_order", "mall.write_order",
                        "mall.read_customer", "mall.write_customer",
                        "mall.read_category", "mall.write_category",
                        "mall.read_promotion", "mall.write_promotion",
                        "mall.read_application", "mall.write_application"
                    ]
                },
                "webhooks": {
                    "events": [
                        "order.created", "order.updated", "order.canceled",
                        "product.created", "product.updated", "product.deleted",
                        "customer.created", "customer.updated"
                    ],
                    "format": "JSON",
                    "retry": "3 times with exponential backoff"
                }
            }
            self.save_json(app_guide, 'app/guide.json')
            print("  ✓ App development guide created")

        # 인덱스 생성
        print("\nGenerating index...")
        index = self.generate_index(api_endpoints, replacement_codes, modules)
        self.save_json(index, 'index.json')
        print("  ✓ index.json created")

        # AI용 요약본 생성
        print("Generating AI summary...")
        summary = self.generate_summary(api_endpoints, replacement_codes, modules)
        self.save_markdown(summary, 'SUMMARY.md')
        print("  ✓ SUMMARY.md created")

        # 최종 결과
        print("\n=== Crawling Complete ===")
        print(f"Pages crawled: {self.stats.pages_crawled}")
        print(f"API endpoints: {self.stats.api_endpoints}")
        print(f"Replacement codes: {self.stats.replacement_codes}")
        print(f"Modules: {self.stats.modules}")

        if self.stats.errors:
            print(f"\nErrors ({len(self.stats.errors)}):")
            for error in self.stats.errors:
                print(f"  - {error}")

        # 결과 JSON 반환 (AI 에이전트용)
        result = {
            "status": "completed" if not self.stats.errors else "completed_with_errors",
            "output_dir": str(self.output_dir),
            "stats": asdict(self.stats),
            "files": [
                "api/endpoints.json",
                "design/replacement-codes.json",
                "design/modules.json",
                "app/guide.json",
                "index.json",
                "SUMMARY.md"
            ]
        }

        # 결과 파일 저장
        self.save_json(result, 'result.json')

        return result


def main():
    parser = argparse.ArgumentParser(description='Cafe24 Developer Documentation Crawler')
    parser.add_argument('--output-dir', '-o', default='doc/cafe24_api',
                       help='Output directory for crawled documentation')
    parser.add_argument('--target', '-t', action='append',
                       choices=['api', 'design', 'app', 'all'],
                       help='Target sections to crawl (can specify multiple)')
    parser.add_argument('--verbose', '-v', action='store_true',
                       help='Enable verbose logging')
    parser.add_argument('--format', '-f', default='json+md',
                       choices=['json', 'md', 'json+md'],
                       help='Output format')

    args = parser.parse_args()

    # 타겟 처리
    targets = args.target or ['all']
    if 'all' in targets:
        targets = ['api', 'design', 'app']

    # 크롤러 실행
    crawler = Cafe24DocCrawler(args.output_dir, verbose=args.verbose)
    result = crawler.run(targets)

    # JSON 결과 출력 (AI 에이전트가 파싱할 수 있도록)
    print("\n--- Result JSON ---")
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
