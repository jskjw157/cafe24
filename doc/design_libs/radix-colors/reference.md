# Radix UI Colors Reference

> Crawled: 2026-01-04T19:53:48.648863
> Sections: 4
> Code Examples: 8

---

## Installation

**Source**: [https://www.radix-ui.com/colors/docs/overview/installation](https://www.radix-ui.com/colors/docs/overview/installation)
**Category**: `docs`

### Topics
- npm
- CDN

### Code Examples

**Example 1** (bash):
```bash
# with npmnpminstall@radix-ui/colors# with yarnyarnadd@radix-ui/colors# with pnpmpnpmadd@radix-ui/colors
```

**Example 2** (html):
```html
<!-- Load whichever light and dark scales you need --><linkrel="stylesheet"href="https://cdn.jsdelivr.net/npm/@radix-ui/colors@latest/gray.css"/><linkrel="stylesheet"href="https://cdn.jsdelivr.net/npm/@radix-ui/colors@latest/blue.css"/><linkrel="stylesheet"href="https://cdn.jsdelivr.net/npm/@radix-ui/colors@latest/green.css"/><linkrel="stylesheet"href="https://cdn.jsdelivr.net/npm/@radix-ui/colors@latest/red.css"/><linkrel="stylesheet"href="https://cdn.jsdelivr.net/npm/@radix-ui/colors@latest/gr
... (truncated)
```

**Example 3** (html):
```html
<linkrel="stylesheet"href="https://cdn.jsdelivr.net/npm/@radix-ui/colors@3.0.0/blue.css"/><linkrel="stylesheet"href="https://cdn.jsdelivr.net/npm/@radix-ui/colors@3.0.0/blue-dark.css"/>
```

---

## Usage

**Source**: [https://www.radix-ui.com/colors/docs/overview/usage](https://www.radix-ui.com/colors/docs/overview/usage)
**Category**: `docs`

### Topics
- Vanilla CSS
- styled-components
- emotion
- vanilla-extract

### Code Examples

**Example 1** (css):
```css
/* Import only the scales you need */@import"@radix-ui/colors/gray.css";@import"@radix-ui/colors/blue.css";@import"@radix-ui/colors/green.css";@import"@radix-ui/colors/red.css";@import"@radix-ui/colors/gray-dark.css";@import"@radix-ui/colors/blue-dark.css";@import"@radix-ui/colors/green-dark.css";@import"@radix-ui/colors/red-dark.css";/* Use the colors as CSS variables */.button{background-color:var(--blue-4);color:var(--blue-11);border-color:var(--blue-7);}.button:hover{background-color:var(--b
... (truncated)
```

**Example 2** (html):
```html
<!-- For dark mode, apply a `.dark` class to <body> or a parent. --><bodyclass="dark"><buttonclass="button">Button</button></body>
```

**Example 3** (js):
```js
import{gray,blue,red,green,grayDark,blueDark,redDark,greenDark,}from"@radix-ui/colors";importstyled,{ThemeProvider}from"styled-components";// Create your themeconsttheme={colors:{...gray,...blue,...red,...green,},};// Create your dark themeconstdarkTheme={colors:{...grayDark,...blueDark,...redDark,...greenDark,},};// Use the colors in your stylesconstButton=styled.button`background-color:${(props)=>props.theme.colors.blue4};color:${(props)=>props.theme.colors.blue11};border-color:${(props)=>prop
... (truncated)
```

**Example 4** (js):
```js
import{gray,blue,red,green,grayDark,blueDark,redDark,greenDark,}from"@radix-ui/colors";import{ThemeProvider}from"@emotion/react";importstyledfrom"@emotion/styled";
```

**Example 5** (js):
```js
import{gray,blue,red,green,grayDark,blueDark,redDark,greenDark,}from"@radix-ui/colors";import{createTheme}from"@vanilla-extract/css";exportconst[theme,vars]=createTheme({colors:{...gray,...blue,...red,...green,},});exportconstdarkTheme=createTheme(vars,{colors:{...grayDark,...blueDark,...redDark,...greenDark,},});// Use the colors in your stylesexportconststyles={button:style({backgroundColor:vars.colors.blue4,color:vars.colors.blue11,borderColor:vars.colors.blue7,":hover":{backgroundColor:vars.
... (truncated)
```

---

## Understanding the scale

**Source**: [https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale)
**Category**: `docs`

### Topics
- Use cases
- Steps 1–2: Backgrounds
- Steps 3–5: Component backgrounds
- Steps 6–8: Borders
- Steps 9–10: Solid backgrounds
- Steps 11–12: Text

---

## Composing a color palette

**Source**: [https://www.radix-ui.com/colors/docs/palette-composition/composing-a-palette](https://www.radix-ui.com/colors/docs/palette-composition/composing-a-palette)
**Category**: `docs`

### Topics
- Choosing a brand scale
- Custom brand colors
- Choosing a gray scale
- Neutral pairing
- Natural pairing
- Choosing semantic scales
- Choosing text scales

---
