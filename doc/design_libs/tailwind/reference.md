# Tailwind CSS Reference

> Crawled: 2026-01-04T19:53:33.764271
> Sections: 9
> Code Examples: 140

---

## Get started with Tailwind CSS

**Source**: [https://tailwindcss.com/docs/installation/using-vite](https://tailwindcss.com/docs/installation/using-vite)
**Category**: `installation`

### Topics
- Installation
- Using Vite
- Using PostCSS
- Tailwind CLI
- Framework Guides
- Play CDN
- Installing Tailwind CSS as a Vite plugin

### Code Examples

**Example 1** (text):
```text
npmcreatevite@latestmy-projectcdmy-project
```

**Example 2** (text):
```text
npminstalltailwindcss@tailwindcss/vite
```

**Example 3** (text):
```text
import{defineConfig}from'vite'importtailwindcssfrom'@tailwindcss/vite'exportdefaultdefineConfig({plugins:[tailwindcss(),],})
```

**Example 4** (text):
```text
@import"tailwindcss";
```

**Example 5** (text):
```text
npmrundev
```

---

## Styling with utility classes

**Source**: [https://tailwindcss.com/docs/utility-first](https://tailwindcss.com/docs/utility-first)
**Category**: `utility-first`

### Topics
- Overview
- Why not just use inline styles?
- Thinking in utility classes
- Styling hover and focus states
- Media queries and breakpoints
- Targeting dark mode
- Using class composition
- Using arbitrary values
- Complex selectors
- When to use inline styles

### Code Examples

**Example 1** (text):
```text
<divclass="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"><imgclass="size-12 shrink-0"src="/img/logo.svg"alt="ChitChat Logo"/><div><divclass="text-xl font-medium text-black dark:text-white">ChitChat</div><pclass="text-gray-500 dark:text-gray-400">You have a new message!</p></div></div>
```

**Example 2** (text):
```text
<divclass="flex flex-col gap-2 p-8sm:flex-rowsm:items-centersm:gap-6sm:py-4..."><imgclass="mx-auto block h-24 rounded-fullsm:mx-0sm:shrink-0"src="/img/erin-lindford.jpg"alt=""/><divclass="space-y-2 text-centersm:text-left"><divclass="space-y-0.5"><pclass="text-lg font-semibold text-black">Erin Lindford</p><pclass="font-medium text-gray-500">Product Engineer</p></div><buttonclass="border-purple-200 text-purple-600hover:border-transparenthover:bg-purple-600hover:text-whiteactive:bg-purple-700...">
... (truncated)
```

**Example 3** (text):
```text
<buttonclass="bg-sky-500hover:bg-sky-700...">Save changes</button>
```

**Example 4** (text):
```text
.hover\:bg-sky-700{&:hover {background-color:var(--color-sky-700);}}
```

**Example 5** (text):
```text
<buttonclass="btn">Save changes</button><style>.btn{background-color:var(--color-sky-500);&:hover {background-color:var(--color-sky-700);}}</style>
```

---

## Hover, focus, and other states

**Source**: [https://tailwindcss.com/docs/hover-focus-and-other-states](https://tailwindcss.com/docs/hover-focus-and-other-states)
**Category**: `hover-focus-and-other-states`

### Topics
- Pseudo-classes
- :hover, :focus, and :active
- :first, :last, :odd, and :even
- :required and :disabled
- :has()
- :not()
- Styling based on parent state
- Styling based on sibling state
- Pseudo-elements
- ::before and ::after

### Code Examples

**Example 1** (text):
```text
<buttonclass="bg-sky-500hover:bg-sky-700...">Save changes</button>
```

**Example 2** (text):
```text
.btn-primary{background-color:#0ea5e9;}.btn-primary:hover{background-color:#0369a1;}
```

**Example 3** (text):
```text
.bg-sky-500{background-color:#0ea5e9;}.hover\:bg-sky-700:hover{background-color:#0369a1;}
```

**Example 4** (text):
```text
<buttonclass="dark:md:hover:bg-fuchsia-600...">Save changes</button>
```

**Example 5** (text):
```text
<buttonclass="bg-violet-500hover:bg-violet-600focus:outline-2focus:outline-offset-2focus:outline-violet-500active:bg-violet-700...">Save changes</button>
```

---

## Responsive design

**Source**: [https://tailwindcss.com/docs/responsive-design](https://tailwindcss.com/docs/responsive-design)
**Category**: `responsive-design`

### Topics
- Overview
- Working mobile-first
- Targeting mobile screens
- Targeting a breakpoint range
- Targeting a single breakpoint
- Using custom breakpoints
- Customizing your theme
- Removing default breakpoints
- Using arbitrary values
- Container queries

### Code Examples

**Example 1** (text):
```text
<metaname="viewport"content="width=device-width, initial-scale=1.0"/>
```

**Example 2** (text):
```text
<!-- Width of 16 by default, 32 on medium screens, and 48 on large screens --><imgclass="w-16md:w-32lg:w-48"src="..."/>
```

**Example 3** (text):
```text
<divclass="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-mdmd:max-w-2xl"><divclass="md:flex"><divclass="md:shrink-0"><imgclass="h-48 w-full object-covermd:h-fullmd:w-48"src="/img/building.jpg"alt="Modern building architecture"/></div><divclass="p-8"><divclass="text-sm font-semibold tracking-wide text-indigo-500 uppercase">Company retreats</div><ahref="#"class="mt-1 block text-lg leading-tight font-medium text-black hover:underline">Incredible accommodation for your team</a><pclass=
... (truncated)
```

**Example 4** (text):
```text
<!-- This will only center text on screens 640px and wider, not on small screens --><divclass="sm:text-center"></div>
```

**Example 5** (text):
```text
<!-- This will center text on mobile, and left align it on screens 640px and wider --><divclass="text-center sm:text-left"></div>
```

---

## Dark mode

**Source**: [https://tailwindcss.com/docs/dark-mode](https://tailwindcss.com/docs/dark-mode)
**Category**: `dark-mode`

### Topics
- Overview
- Toggling dark mode manually
- Using a data attribute
- With system theme support
- On this page

### Code Examples

**Example 1** (text):
```text
<divclass="bg-whitedark:bg-gray-800rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5"><div><spanclass="inline-flex items-center justify-center rounded-md bg-indigo-500 p-2 shadow-lg"><svgclass="h-6 w-6 stroke-white"...><!-- ... --></svg></span></div><h3class="text-gray-900dark:text-whitemt-5 text-base font-medium tracking-tight ">Writes upside-down</h3><pclass="text-gray-500dark:text-gray-400mt-2 text-sm ">The Zero Gravity Pen can be used to write in any orientation, including upside-down. It 
... (truncated)
```

**Example 2** (text):
```text
@import"tailwindcss";@custom-variantdark (&:where(.dark, .dark *));
```

**Example 3** (text):
```text
<htmlclass="dark"><body><divclass="bg-whitedark:bg-black"><!-- ... --></div></body></html>
```

**Example 4** (text):
```text
@import"tailwindcss";@custom-variantdark (&:where([data-theme=dark], [data-theme=dark] *));
```

**Example 5** (text):
```text
<htmldata-theme="dark"><body><divclass="bg-whitedark:bg-black"><!-- ... --></div></body></html>
```

---

## Theme variables

**Source**: [https://tailwindcss.com/docs/theme](https://tailwindcss.com/docs/theme)
**Category**: `theme`

### Topics
- Overview
- What are theme variables?
- Relationship to utility classes
- Theme variable namespaces
- Default theme variables
- Customizing your theme
- Extending the default theme
- Overriding the default theme
- Using a custom theme
- Defining animation keyframes

### Code Examples

**Example 1** (text):
```text
@import"tailwindcss";@theme{--color-mint-500:oklch(0.72 0.11 178);}
```

**Example 2** (text):
```text
<divclass="bg-mint-500"><!-- ... --></div>
```

**Example 3** (text):
```text
<divstyle="background-color:var(--color-mint-500)"><!-- ... --></div>
```

**Example 4** (text):
```text
@theme{--font-sans:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";--font-serif:ui-serif,Georgia,Cambria,"Times New Roman",Times,serif;--font-mono:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;/* ... */}
```

**Example 5** (text):
```text
@import"tailwindcss";@theme{--font-poppins:Poppins,sans-serif;}
```

---

## Colors

**Source**: [https://tailwindcss.com/docs/colors](https://tailwindcss.com/docs/colors)
**Category**: `colors`

### Topics
- Working with colors
- Using color utilities
- Adjusting opacity
- Targeting dark mode
- Referencing in CSS
- Customizing your colors
- Overriding default colors
- Disabling default colors
- Using a custom palette
- Referencing other variables

### Code Examples

**Example 1** (text):
```text
<div><divclass="bg-sky-50"></div><divclass="bg-sky-100"></div><divclass="bg-sky-200"></div><divclass="bg-sky-300"></div><divclass="bg-sky-400"></div><divclass="bg-sky-500"></div><divclass="bg-sky-600"></div><divclass="bg-sky-700"></div><divclass="bg-sky-800"></div><divclass="bg-sky-900"></div><divclass="bg-sky-950"></div></div>
```

**Example 2** (text):
```text
<divclass="flex items-center gap-4 rounded-lgbg-whitep-6 shadow-md outlineoutline-black/5dark:bg-gray-800"><spanclass="inline-flex shrink-0 rounded-full borderborder-pink-300bg-pink-100p-2dark:border-pink-300/10dark:bg-pink-400/10"><svgclass="size-6stroke-pink-700dark:stroke-pink-500"><!-- ... --></svg></span><div><pclass="text-gray-700dark:text-gray-400"><spanclass="font-mediumtext-gray-950dark:text-white">Tom Watson</span>mentioned you in<spanclass="font-mediumtext-gray-950dark:text-white">Log
... (truncated)
```

**Example 3** (text):
```text
<div><divclass="bg-sky-500/10"></div><divclass="bg-sky-500/20"></div><divclass="bg-sky-500/30"></div><divclass="bg-sky-500/40"></div><divclass="bg-sky-500/50"></div><divclass="bg-sky-500/60"></div><divclass="bg-sky-500/70"></div><divclass="bg-sky-500/80"></div><divclass="bg-sky-500/90"></div><divclass="bg-sky-500/100"></div></div>
```

**Example 4** (text):
```text
<divclass="bg-pink-500/[71.37%]"><!-- ... --></div><divclass="bg-cyan-400/(--my-alpha-value)"><!-- ... --></div>
```

**Example 5** (text):
```text
<divclass="bg-whitedark:bg-gray-800rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5"><div><spanclass="inline-flex items-center justify-center rounded-md bg-indigo-500 p-2 shadow-lg"><svgclass="h-6 w-6 stroke-white"...><!-- ... --></svg></span></div><h3class="text-gray-900dark:text-whitemt-5 text-base font-medium tracking-tight ">Writes upside-down</h3><pclass="text-gray-500dark:text-gray-400mt-2 text-sm ">The Zero Gravity Pen can be used to write in any orientation, including upside-down. It 
... (truncated)
```

---

## Colors

**Source**: [https://tailwindcss.com/docs/customizing-colors](https://tailwindcss.com/docs/customizing-colors)
**Category**: `customizing-colors`

### Topics
- Working with colors
- Using color utilities
- Adjusting opacity
- Targeting dark mode
- Referencing in CSS
- Customizing your colors
- Overriding default colors
- Disabling default colors
- Using a custom palette
- Referencing other variables

### Code Examples

**Example 1** (text):
```text
<div><divclass="bg-sky-50"></div><divclass="bg-sky-100"></div><divclass="bg-sky-200"></div><divclass="bg-sky-300"></div><divclass="bg-sky-400"></div><divclass="bg-sky-500"></div><divclass="bg-sky-600"></div><divclass="bg-sky-700"></div><divclass="bg-sky-800"></div><divclass="bg-sky-900"></div><divclass="bg-sky-950"></div></div>
```

**Example 2** (text):
```text
<divclass="flex items-center gap-4 rounded-lgbg-whitep-6 shadow-md outlineoutline-black/5dark:bg-gray-800"><spanclass="inline-flex shrink-0 rounded-full borderborder-pink-300bg-pink-100p-2dark:border-pink-300/10dark:bg-pink-400/10"><svgclass="size-6stroke-pink-700dark:stroke-pink-500"><!-- ... --></svg></span><div><pclass="text-gray-700dark:text-gray-400"><spanclass="font-mediumtext-gray-950dark:text-white">Tom Watson</span>mentioned you in<spanclass="font-mediumtext-gray-950dark:text-white">Log
... (truncated)
```

**Example 3** (text):
```text
<div><divclass="bg-sky-500/10"></div><divclass="bg-sky-500/20"></div><divclass="bg-sky-500/30"></div><divclass="bg-sky-500/40"></div><divclass="bg-sky-500/50"></div><divclass="bg-sky-500/60"></div><divclass="bg-sky-500/70"></div><divclass="bg-sky-500/80"></div><divclass="bg-sky-500/90"></div><divclass="bg-sky-500/100"></div></div>
```

**Example 4** (text):
```text
<divclass="bg-pink-500/[71.37%]"><!-- ... --></div><divclass="bg-cyan-400/(--my-alpha-value)"><!-- ... --></div>
```

**Example 5** (text):
```text
<divclass="bg-whitedark:bg-gray-800rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5"><div><spanclass="inline-flex items-center justify-center rounded-md bg-indigo-500 p-2 shadow-lg"><svgclass="h-6 w-6 stroke-white"...><!-- ... --></svg></span></div><h3class="text-gray-900dark:text-whitemt-5 text-base font-medium tracking-tight ">Writes upside-down</h3><pclass="text-gray-500dark:text-gray-400mt-2 text-sm ">The Zero Gravity Pen can be used to write in any orientation, including upside-down. It 
... (truncated)
```

---

## Theme variables

**Source**: [https://tailwindcss.com/docs/configuration](https://tailwindcss.com/docs/configuration)
**Category**: `configuration`

### Topics
- Overview
- What are theme variables?
- Relationship to utility classes
- Theme variable namespaces
- Default theme variables
- Customizing your theme
- Extending the default theme
- Overriding the default theme
- Using a custom theme
- Defining animation keyframes

### Code Examples

**Example 1** (text):
```text
@import"tailwindcss";@theme{--color-mint-500:oklch(0.72 0.11 178);}
```

**Example 2** (text):
```text
<divclass="bg-mint-500"><!-- ... --></div>
```

**Example 3** (text):
```text
<divstyle="background-color:var(--color-mint-500)"><!-- ... --></div>
```

**Example 4** (text):
```text
@theme{--font-sans:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";--font-serif:ui-serif,Georgia,Cambria,"Times New Roman",Times,serif;--font-mono:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;/* ... */}
```

**Example 5** (text):
```text
@import"tailwindcss";@theme{--font-poppins:Poppins,sans-serif;}
```

---
