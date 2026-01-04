#!/usr/bin/env python3
"""
URL to Cafe24 Skin Converter Pipeline

Script-First 원칙에 따라:
1. URL에서 HTML 가져오기
2. HtmlSlim으로 불필요한 요소 제거
3. AI 에이전트가 Cafe24 템플릿으로 변환할 수 있도록 정제된 데이터 제공

Usage:
    python script/url_to_cafe24_skin.py --url "https://example.com"
    python script/url_to_cafe24_skin.py --url "https://example.com" --output-dir "output/skins"
"""

import argparse
import json
import re
import sys
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
class SlimResult:
    """슬림 처리 결과"""
    html: str
    removed_elements: dict
    original_size: int
    slimmed_size: int
    reduction_percent: float


@dataclass
class Section:
    """페이지 섹션"""
    name: str
    tag: str
    html: str
    text_content: str
    links: list
    images: list


@dataclass
class PageAnalysis:
    """페이지 분석 결과"""
    url: str
    title: str
    sections: list
    colors: list
    fonts: list
    slimmed_html: str
    stats: dict


def slim_html(html: str) -> SlimResult:
    """
    HTML 슬림 처리 (HtmlSlim과 동일한 로직)
    """
    removed_elements = {}
    original_size = len(html)

    def count_removed(tag: str):
        removed_elements[tag] = removed_elements.get(tag, 0) + 1

    slimmed = html

    # Remove <head> section
    slimmed = re.sub(r'<head\b[^>]*>[\s\S]*?</head>', lambda m: (count_removed('head'), '')[1], slimmed, flags=re.IGNORECASE)

    # Remove scripts
    slimmed = re.sub(r'<script\b[^>]*>[\s\S]*?</script>', lambda m: (count_removed('script'), '')[1], slimmed, flags=re.IGNORECASE)

    # Remove noscript
    slimmed = re.sub(r'<noscript\b[^>]*>[\s\S]*?</noscript>', lambda m: (count_removed('noscript'), '')[1], slimmed, flags=re.IGNORECASE)

    # Remove styles
    slimmed = re.sub(r'<style\b[^>]*>[\s\S]*?</style>', lambda m: (count_removed('style'), '')[1], slimmed, flags=re.IGNORECASE)

    # Remove comments
    slimmed = re.sub(r'<!--[\s\S]*?-->', lambda m: (count_removed('comment'), '')[1], slimmed)

    # Remove meta tags
    slimmed = re.sub(r'<meta\b[^>]*>', lambda m: (count_removed('meta'), '')[1], slimmed, flags=re.IGNORECASE)

    # Remove link tags
    slimmed = re.sub(r'<link\b[^>]*>', lambda m: (count_removed('link'), '')[1], slimmed, flags=re.IGNORECASE)

    # Remove SVG elements
    slimmed = re.sub(r'<svg\b[^>]*>[\s\S]*?</svg>', lambda m: (count_removed('svg'), '')[1], slimmed, flags=re.IGNORECASE)

    # Remove data-* attributes
    slimmed = re.sub(r'\s+data-[a-zA-Z0-9-]+="[^"]*"', lambda m: (count_removed('data-attr'), '')[1], slimmed)

    # Remove event handlers
    slimmed = re.sub(r'\s+on[a-z]+="[^"]*"', lambda m: (count_removed('event-handler'), '')[1], slimmed, flags=re.IGNORECASE)

    # Remove id attributes
    slimmed = re.sub(r'\s+id="[^"]*"', lambda m: (count_removed('id-attr'), '')[1], slimmed)

    # Remove class attributes
    slimmed = re.sub(r'\s+class="[^"]*"', lambda m: (count_removed('class-attr'), '')[1], slimmed)

    # Remove style attributes
    slimmed = re.sub(r'\s+style="[^"]*"', lambda m: (count_removed('style-attr'), '')[1], slimmed)

    # Clean whitespace
    slimmed = re.sub(r'^\s*[\r\n]', '', slimmed, flags=re.MULTILINE)
    slimmed = re.sub(r'\s{2,}', ' ', slimmed)
    slimmed = slimmed.strip()

    slimmed_size = len(slimmed)
    reduction = ((original_size - slimmed_size) / original_size * 100) if original_size > 0 else 0

    return SlimResult(
        html=slimmed,
        removed_elements=removed_elements,
        original_size=original_size,
        slimmed_size=slimmed_size,
        reduction_percent=round(reduction, 1)
    )


def extract_colors(html: str) -> list:
    """CSS에서 색상 추출"""
    colors = set()

    # Hex colors
    hex_colors = re.findall(r'#[0-9a-fA-F]{3,6}\b', html)
    colors.update(hex_colors)

    # RGB/RGBA colors
    rgb_colors = re.findall(r'rgba?\([^)]+\)', html)
    colors.update(rgb_colors)

    return list(colors)[:20]  # 상위 20개만


def extract_fonts(html: str) -> list:
    """CSS에서 폰트 추출"""
    fonts = set()

    # font-family patterns
    font_patterns = re.findall(r'font-family:\s*([^;}"]+)', html, re.IGNORECASE)
    for font in font_patterns:
        # Clean and split font families
        clean = font.strip().strip("'\"")
        fonts.add(clean.split(',')[0].strip().strip("'\""))

    return list(fonts)[:10]


def extract_sections(soup: BeautifulSoup, base_url: str) -> list:
    """페이지 섹션 추출"""
    sections = []

    # 주요 시맨틱 태그들
    semantic_tags = ['header', 'nav', 'main', 'section', 'article', 'aside', 'footer']

    for tag_name in semantic_tags:
        for element in soup.find_all(tag_name):
            # 링크 추출
            links = []
            for a in element.find_all('a', href=True):
                href = a.get('href', '')
                if href and not href.startswith('#') and not href.startswith('javascript:'):
                    links.append({
                        'text': a.get_text(strip=True)[:50],
                        'href': urljoin(base_url, href)
                    })

            # 이미지 추출
            images = []
            for img in element.find_all('img', src=True):
                images.append({
                    'src': urljoin(base_url, img.get('src', '')),
                    'alt': img.get('alt', '')[:50]
                })

            section = Section(
                name=tag_name,
                tag=tag_name,
                html=str(element)[:2000],  # 최대 2000자
                text_content=element.get_text(strip=True)[:500],
                links=links[:10],
                images=images[:10]
            )
            sections.append(section)

    return sections


def analyze_page(url: str) -> PageAnalysis:
    """페이지 분석"""
    print(f"Fetching: {url}")

    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    }

    response = requests.get(url, headers=headers, timeout=30)
    response.raise_for_status()

    html = response.text
    soup = BeautifulSoup(html, 'html.parser')

    # 제목 추출
    title = soup.title.string if soup.title else urlparse(url).netloc

    # 색상 및 폰트 추출 (원본 HTML에서)
    colors = extract_colors(html)
    fonts = extract_fonts(html)

    # 섹션 추출
    sections = extract_sections(soup, url)

    # HTML 슬림 처리
    slim_result = slim_html(html)

    return PageAnalysis(
        url=url,
        title=title,
        sections=sections,
        colors=colors,
        fonts=fonts,
        slimmed_html=slim_result.html,
        stats={
            'original_size': slim_result.original_size,
            'slimmed_size': slim_result.slimmed_size,
            'reduction_percent': slim_result.reduction_percent,
            'removed_elements': slim_result.removed_elements,
            'section_count': len(sections)
        }
    )


def generate_cafe24_template_hints(analysis: PageAnalysis) -> dict:
    """Cafe24 템플릿 변환을 위한 힌트 생성"""
    hints = {
        'recommended_modules': [],
        'replacement_codes': [],
        'structure_mapping': {}
    }

    # 섹션별 추천 모듈
    section_to_module = {
        'header': ['Layout_LogoTop', 'Layout_category'],
        'nav': ['Layout_category', 'Layout_SearchBar'],
        'main': ['product_listmain', 'product_detail'],
        'section': ['product_listrecommend', 'product_listnew'],
        'article': ['board_list', 'board_view'],
        'aside': ['Layout_QuickMenu', 'product_relation'],
        'footer': ['xans-layout-footer']
    }

    for section in analysis.sections:
        if section.tag in section_to_module:
            hints['recommended_modules'].extend(section_to_module[section.tag])
            hints['structure_mapping'][section.tag] = section_to_module[section.tag]

    hints['recommended_modules'] = list(set(hints['recommended_modules']))

    # 이미지가 있으면 이미지 관련 치환코드 추천
    has_images = any(section.images for section in analysis.sections)
    if has_images:
        hints['replacement_codes'].extend([
            '{$image_big}', '{$image_medium}', '{$product_name}'
        ])

    # 링크가 있으면 네비게이션 치환코드 추천
    has_nav_links = any(section.tag == 'nav' and section.links for section in analysis.sections)
    if has_nav_links:
        hints['replacement_codes'].extend([
            '{$link_product_list}', '{$name_or_img_tag}'
        ])

    hints['replacement_codes'] = list(set(hints['replacement_codes']))

    return hints


def main():
    parser = argparse.ArgumentParser(description='URL to Cafe24 Skin Converter Pipeline')
    parser.add_argument('--url', '-u', required=True, help='URL to analyze')
    parser.add_argument('--output-dir', '-o', default='output/skins', help='Output directory')
    parser.add_argument('--verbose', '-v', action='store_true', help='Verbose output')

    args = parser.parse_args()

    # 출력 디렉토리 생성
    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    try:
        # 페이지 분석
        analysis = analyze_page(args.url)

        # Cafe24 힌트 생성
        hints = generate_cafe24_template_hints(analysis)

        # 결과 저장
        result = {
            'generated_at': datetime.now().isoformat(),
            'url': analysis.url,
            'title': analysis.title,
            'stats': analysis.stats,
            'colors': analysis.colors,
            'fonts': analysis.fonts,
            'sections': [asdict(s) for s in analysis.sections],
            'cafe24_hints': hints
        }

        # JSON 결과 저장
        domain = urlparse(args.url).netloc.replace('.', '_')
        result_file = output_dir / f'{domain}_analysis.json'
        with open(result_file, 'w', encoding='utf-8') as f:
            json.dump(result, f, ensure_ascii=False, indent=2)

        # 슬림 HTML 저장
        slim_file = output_dir / f'{domain}_slimmed.html'
        with open(slim_file, 'w', encoding='utf-8') as f:
            f.write(analysis.slimmed_html)

        # 콘솔 출력
        print("\n=== URL to Cafe24 Skin Pipeline ===")
        print(f"URL: {analysis.url}")
        print(f"Title: {analysis.title}")
        print(f"\nStats:")
        print(f"  Original size: {analysis.stats['original_size']:,} bytes")
        print(f"  Slimmed size: {analysis.stats['slimmed_size']:,} bytes")
        print(f"  Reduction: {analysis.stats['reduction_percent']}%")
        print(f"  Sections found: {analysis.stats['section_count']}")
        print(f"\nColors found: {len(analysis.colors)}")
        print(f"Fonts found: {len(analysis.fonts)}")
        print(f"\nCafe24 Hints:")
        print(f"  Recommended modules: {', '.join(hints['recommended_modules'][:5])}")
        print(f"  Replacement codes: {', '.join(hints['replacement_codes'][:5])}")
        print(f"\nOutput files:")
        print(f"  Analysis: {result_file}")
        print(f"  Slimmed HTML: {slim_file}")

        # JSON 결과 출력 (AI 에이전트용)
        print("\n--- Result JSON ---")
        summary = {
            'status': 'completed',
            'url': analysis.url,
            'title': analysis.title,
            'stats': analysis.stats,
            'output_files': {
                'analysis': str(result_file),
                'slimmed_html': str(slim_file)
            },
            'cafe24_hints': hints
        }
        print(json.dumps(summary, ensure_ascii=False, indent=2))

    except Exception as e:
        error_result = {
            'status': 'error',
            'url': args.url,
            'error': str(e)
        }
        print(json.dumps(error_result, ensure_ascii=False, indent=2))
        sys.exit(1)


if __name__ == '__main__':
    main()
