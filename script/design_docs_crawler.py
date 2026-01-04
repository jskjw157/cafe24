#!/usr/bin/env python3
"""
Design Documentation Crawler
=============================
Crawls design-related documentation sites and outputs structured JSON/Markdown
for AI agent consumption.

Targets:
- Tailwind CSS (docs)
- Iconify Design (docs)
- Framer Motion (GitHub + docs)
- Radix UI Colors (docs)

Usage:
    python script/design_docs_crawler.py --output doc/design_libs --format json+md
    python script/design_docs_crawler.py --target tailwind --output doc/design_libs
    python script/design_docs_crawler.py --target all --output doc/design_libs
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

# Parser selection - prefer lxml if available, fallback to html.parser
try:
    import lxml
    HTML_PARSER = "lxml"
except ImportError:
    HTML_PARSER = "html.parser"


@dataclass
class DocSection:
    """Represents a documentation section."""
    title: str
    url: str
    content: str
    code_blocks: list[dict]
    subsections: list[str]
    category: str


@dataclass
class CrawlResult:
    """Result of crawling a documentation site."""
    source: str
    crawled_at: str
    version: Optional[str]
    sections: list[DocSection]
    summary: dict


class DesignDocsCrawler:
    """Main crawler class for design documentation sites."""

    HEADERS = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    }

    TARGETS = {
        "tailwind": {
            "name": "Tailwind CSS",
            "base_url": "https://tailwindcss.com",
            "docs_paths": [
                "/docs/installation/using-vite",
                "/docs/utility-first",
                "/docs/hover-focus-and-other-states",
                "/docs/responsive-design",
                "/docs/dark-mode",
                "/docs/theme",
                "/docs/colors",
                "/docs/customizing-colors",
                "/docs/configuration",
            ],
            "crawl_method": "html_docs",
        },
        "iconify": {
            "name": "Iconify",
            "base_url": "https://iconify.design",
            "docs_paths": [
                "/docs/iconify-icon/",
                "/docs/icon-components/",
                "/docs/icons/",
                "/docs/api/",
            ],
            "crawl_method": "html_docs",
        },
        "framer-motion": {
            "name": "Framer Motion",
            "base_url": "https://motion.dev",
            "docs_paths": [
                "/docs/react-quick-start",
                "/docs/react-animation",
                "/docs/react-gestures",
                "/docs/react-layout-animations",
                "/docs/react-scroll-animations",
                "/docs/react-transitions",
            ],
            "github_urls": [
                "https://api.github.com/repos/framer/motion/readme",
                "https://raw.githubusercontent.com/richawo/framer-motion-cheatsheet/main/README.md",
            ],
            "crawl_method": "mixed",
        },
        "radix-colors": {
            "name": "Radix UI Colors",
            "base_url": "https://www.radix-ui.com",
            "docs_paths": [
                "/colors/docs/overview/installation",
                "/colors/docs/overview/usage",
                "/colors/docs/palette-composition/understanding-the-scale",
                "/colors/docs/palette-composition/composing-a-palette",
            ],
            "crawl_method": "html_docs",
        },
    }

    def __init__(self, output_dir: str, format_type: str = "json+md"):
        self.output_dir = Path(output_dir)
        self.format_type = format_type
        self.session = requests.Session()
        self.session.headers.update(self.HEADERS)

    def fetch_page(self, url: str, retry: int = 3) -> Optional[str]:
        """Fetch a page with retry logic."""
        for attempt in range(retry):
            try:
                response = self.session.get(url, timeout=30)
                response.raise_for_status()
                return response.text
            except requests.RequestException as e:
                print(f"  [!] Attempt {attempt + 1} failed for {url}: {e}")
                time.sleep(2 ** attempt)
        return None

    def extract_code_blocks(self, soup: BeautifulSoup) -> list[dict]:
        """Extract code blocks from HTML."""
        code_blocks = []

        for pre in soup.find_all("pre"):
            code = pre.find("code")
            if code:
                lang = ""
                if code.get("class"):
                    for cls in code.get("class", []):
                        if cls.startswith("language-"):
                            lang = cls.replace("language-", "")
                            break

                code_blocks.append({
                    "language": lang,
                    "code": code.get_text(strip=True),
                })

        return code_blocks

    def extract_main_content(self, soup: BeautifulSoup) -> str:
        """Extract main content from HTML, removing navigation and footers."""
        # Try common content selectors
        selectors = [
            "main",
            "article",
            "[role='main']",
            ".docs-content",
            ".content",
            "#content",
        ]

        for selector in selectors:
            content = soup.select_one(selector)
            if content:
                # Remove nav, footer, sidebar elements
                for tag in content.find_all(["nav", "footer", "aside", "script", "style"]):
                    tag.decompose()
                return content.get_text(separator="\n", strip=True)

        # Fallback to body
        body = soup.find("body")
        if body:
            for tag in body.find_all(["nav", "footer", "header", "script", "style"]):
                tag.decompose()
            return body.get_text(separator="\n", strip=True)

        return ""

    def crawl_html_docs(self, target_config: dict) -> list[DocSection]:
        """Crawl HTML documentation pages."""
        sections = []
        base_url = target_config["base_url"]

        for path in target_config["docs_paths"]:
            url = urljoin(base_url, path)
            print(f"  [→] Crawling: {url}")

            html = self.fetch_page(url)
            if not html:
                continue

            soup = BeautifulSoup(html, HTML_PARSER)

            # Extract title
            title = ""
            h1 = soup.find("h1")
            if h1:
                title = h1.get_text(strip=True)
            else:
                title_tag = soup.find("title")
                if title_tag:
                    title = title_tag.get_text(strip=True)

            # Extract content
            content = self.extract_main_content(soup)
            code_blocks = self.extract_code_blocks(soup)

            # Extract subsection headers
            subsections = []
            for h2 in soup.find_all(["h2", "h3"]):
                text = h2.get_text(strip=True)
                if text:
                    subsections.append(text)

            # Determine category from URL path
            path_parts = urlparse(url).path.split("/")
            category = path_parts[2] if len(path_parts) > 2 else "general"

            sections.append(DocSection(
                title=title,
                url=url,
                content=content[:5000],  # Limit content size
                code_blocks=code_blocks[:20],  # Limit code blocks
                subsections=subsections[:15],
                category=category,
            ))

            time.sleep(0.5)  # Rate limiting

        return sections

    def crawl_github_readme(self, urls: list[str]) -> list[DocSection]:
        """Crawl GitHub READMEs."""
        sections = []

        for url in urls:
            print(f"  [→] Fetching GitHub: {url}")

            if "api.github.com" in url:
                # GitHub API - returns JSON with base64 content
                response = self.session.get(url)
                if response.ok:
                    data = response.json()
                    import base64
                    content = base64.b64decode(data.get("content", "")).decode("utf-8")
                else:
                    continue
            else:
                # Raw content
                content = self.fetch_page(url)
                if not content:
                    continue

            # Extract code blocks from markdown
            code_blocks = []
            code_pattern = r"```(\w*)\n(.*?)```"
            for match in re.finditer(code_pattern, content, re.DOTALL):
                code_blocks.append({
                    "language": match.group(1) or "text",
                    "code": match.group(2).strip(),
                })

            # Extract headers for subsections
            subsections = []
            for line in content.split("\n"):
                if line.startswith("## ") or line.startswith("### "):
                    subsections.append(line.lstrip("#").strip())

            sections.append(DocSection(
                title="GitHub README",
                url=url,
                content=content[:5000],
                code_blocks=code_blocks[:20],
                subsections=subsections[:15],
                category="github",
            ))

            time.sleep(0.5)

        return sections

    def crawl_target(self, target_name: str) -> CrawlResult:
        """Crawl a specific target."""
        config = self.TARGETS.get(target_name)
        if not config:
            raise ValueError(f"Unknown target: {target_name}")

        print(f"\n[*] Crawling {config['name']}...")

        sections = []

        if config["crawl_method"] in ("html_docs", "mixed"):
            sections.extend(self.crawl_html_docs(config))

        if config["crawl_method"] == "mixed" and "github_urls" in config:
            sections.extend(self.crawl_github_readme(config["github_urls"]))

        # Generate summary
        summary = {
            "total_sections": len(sections),
            "total_code_blocks": sum(len(s.code_blocks) for s in sections),
            "categories": list(set(s.category for s in sections)),
        }

        return CrawlResult(
            source=config["name"],
            crawled_at=datetime.now().isoformat(),
            version=None,
            sections=[asdict(s) for s in sections],
            summary=summary,
        )

    def generate_markdown(self, result: CrawlResult, target_name: str) -> str:
        """Generate Markdown documentation from crawl result."""
        lines = [
            f"# {result.source} Reference",
            "",
            f"> Crawled: {result.crawled_at}",
            f"> Sections: {result.summary['total_sections']}",
            f"> Code Examples: {result.summary['total_code_blocks']}",
            "",
            "---",
            "",
        ]

        for section in result.sections:
            lines.append(f"## {section['title']}")
            lines.append("")
            lines.append(f"**Source**: [{section['url']}]({section['url']})")
            lines.append(f"**Category**: `{section['category']}`")
            lines.append("")

            if section['subsections']:
                lines.append("### Topics")
                for sub in section['subsections'][:10]:
                    lines.append(f"- {sub}")
                lines.append("")

            if section['code_blocks']:
                lines.append("### Code Examples")
                lines.append("")
                for i, block in enumerate(section['code_blocks'][:5], 1):
                    lang = block['language'] or 'text'
                    lines.append(f"**Example {i}** ({lang}):")
                    lines.append(f"```{lang}")
                    # Limit code block size
                    code = block['code'][:500]
                    if len(block['code']) > 500:
                        code += "\n... (truncated)"
                    lines.append(code)
                    lines.append("```")
                    lines.append("")

            lines.append("---")
            lines.append("")

        return "\n".join(lines)

    def generate_ai_summary(self, result: CrawlResult, target_name: str) -> dict:
        """Generate a summary optimized for AI agent consumption."""
        # Extract unique code patterns
        code_patterns = {}
        for section in result.sections:
            for block in section['code_blocks']:
                lang = block['language'] or 'text'
                if lang not in code_patterns:
                    code_patterns[lang] = []
                if len(code_patterns[lang]) < 5:
                    code_patterns[lang].append(block['code'][:300])

        # Extract key concepts from subsections
        all_topics = []
        for section in result.sections:
            all_topics.extend(section['subsections'])

        # Deduplicate and limit
        unique_topics = list(dict.fromkeys(all_topics))[:30]

        return {
            "library": result.source,
            "crawled_at": result.crawled_at,
            "quick_reference": {
                "sections": [s['title'] for s in result.sections],
                "key_topics": unique_topics,
                "code_languages": list(code_patterns.keys()),
            },
            "code_snippets": code_patterns,
            "urls": [s['url'] for s in result.sections],
        }

    def save_results(self, result: CrawlResult, target_name: str):
        """Save crawl results to files."""
        target_dir = self.output_dir / target_name
        target_dir.mkdir(parents=True, exist_ok=True)

        # Save full JSON
        if "json" in self.format_type:
            json_path = target_dir / "full.json"
            with open(json_path, "w", encoding="utf-8") as f:
                json.dump(asdict(result), f, indent=2, ensure_ascii=False)
            print(f"  [✓] Saved: {json_path}")

            # Save AI summary
            summary_path = target_dir / "ai-summary.json"
            summary = self.generate_ai_summary(result, target_name)
            with open(summary_path, "w", encoding="utf-8") as f:
                json.dump(summary, f, indent=2, ensure_ascii=False)
            print(f"  [✓] Saved: {summary_path}")

        # Save Markdown
        if "md" in self.format_type:
            md_path = target_dir / "reference.md"
            md_content = self.generate_markdown(result, target_name)
            with open(md_path, "w", encoding="utf-8") as f:
                f.write(md_content)
            print(f"  [✓] Saved: {md_path}")

    def crawl_all(self, targets: list[str] = None):
        """Crawl all or specified targets."""
        if targets is None or "all" in targets:
            targets = list(self.TARGETS.keys())

        # Ensure output directory exists
        self.output_dir.mkdir(parents=True, exist_ok=True)

        results = {}
        for target in targets:
            if target not in self.TARGETS:
                print(f"[!] Unknown target: {target}, skipping...")
                continue

            try:
                result = self.crawl_target(target)
                self.save_results(result, target)
                results[target] = result.summary
            except Exception as e:
                print(f"[!] Error crawling {target}: {e}")
                results[target] = {"error": str(e)}

        # Save index
        index_path = self.output_dir / "index.json"
        index = {
            "generated_at": datetime.now().isoformat(),
            "libraries": results,
            "paths": {
                target: f"{target}/ai-summary.json"
                for target in results
                if "error" not in results[target]
            },
        }
        with open(index_path, "w", encoding="utf-8") as f:
            json.dump(index, f, indent=2, ensure_ascii=False)
        print(f"\n[✓] Index saved: {index_path}")

        return results


def main():
    parser = argparse.ArgumentParser(
        description="Crawl design documentation sites for AI agent consumption"
    )
    parser.add_argument(
        "--target",
        type=str,
        default="all",
        help="Target to crawl: tailwind, iconify, framer-motion, radix-colors, or all",
    )
    parser.add_argument(
        "--output",
        type=str,
        default="doc/design_libs",
        help="Output directory (default: doc/design_libs)",
    )
    parser.add_argument(
        "--format",
        type=str,
        default="json+md",
        choices=["json", "md", "json+md"],
        help="Output format (default: json+md)",
    )

    args = parser.parse_args()

    crawler = DesignDocsCrawler(
        output_dir=args.output,
        format_type=args.format,
    )

    targets = [t.strip() for t in args.target.split(",")]
    results = crawler.crawl_all(targets)

    print("\n" + "=" * 50)
    print("Crawl Summary:")
    print("=" * 50)
    for target, summary in results.items():
        if "error" in summary:
            print(f"  {target}: ERROR - {summary['error']}")
        else:
            print(f"  {target}: {summary['total_sections']} sections, {summary['total_code_blocks']} code blocks")
    print("=" * 50)


if __name__ == "__main__":
    main()
