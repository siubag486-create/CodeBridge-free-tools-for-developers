# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## IMPORTANT

-ALWAYS use shadcn mcp to create ui
-ALWAYS ask user for permission when implementing a plan
-NEVER use emoji for design.
-ALWAYS prioritize server component over client component
-NEVER write or modify any code unless the user explicitly asks you to implement something. If the user asks a question, only answer it — do not write, edit, or create any code.
-NEVER use MCP tools (Playwright, browser automation, etc.) to verify results without asking the user first. When a task is complete, tell the user "작업 완료, 직접 확인해주세요" and wait for their feedback. Do not self-verify unless the user explicitly says to.

## Commands

```bash
pnpm dev        # Start development server at localhost:3000
pnpm build      # Build for production
pnpm start      # Run production build
pnpm lint       # Run ESLint
```

Use `pnpm` as the package manager (see `pnpm-workspace.yaml`).

To add shadcn/ui components:

```bash
pnpm dlx shadcn@latest add <component-name>
```

## Architecture

This is a **Next.js 16 App Router** project using:

- **React 19** with RSC (React Server Components) enabled
- **TypeScript**
- **Tailwind CSS v4** with `tw-animate-css` for animations
- **shadcn/ui** (new-york style, gray base color) for UI components
- **Lucide React** for icons

### Key Conventions

- **Path aliases**: `@/components`, `@/components/ui`, `@/lib`, `@/hooks` (configured in `tsconfig.json` and `components.json`)
- **`cn()` utility**: Use `lib/utils.ts` `cn()` (clsx + tailwind-merge) for conditional class names
- **CSS variables**: All design tokens defined as CSS custom properties in `app/globals.css` with oklch color space
- **Dark mode**: Class-based via `.dark` class (`@custom-variant dark` in `globals.css`)
- **Fonts**: Geist Sans (`--font-geist-sans`), Geist Mono (`--font-geist-mono`), Space Mono (`--font-space-mono`) via `next/font/google`

### Structure

- `app/` — Next.js App Router pages and layouts
- `app/globals.css` — Global styles, Tailwind imports, CSS variable tokens
- `lib/utils.ts` — `cn()` helper
- `components/ui/` — shadcn/ui generated components (added via CLI)
- `components/` — Custom application components

## Design System

Always dark — no light mode toggle.

**CRT Terminal Theme (CSS custom properties):**

- `--terminal-bg: #0a0a0a` — page background
- `--terminal-surface: #111111` / `--terminal-surface-2: #161616` — elevated surfaces
- `--terminal-border: #1f1f1f` / `--terminal-border-bright: #2a2a2a` — borders
- `--terminal-green: #00ff88` — primary accent
- `--terminal-green-dim: #00cc6a` — dimmed green
- `--electric-blue: #58a6ff` — secondary accent
- `--code-comment: #6e7681` — muted text
- `--code-red: #ff7b72` / `--code-orange: #ffa657` / `--code-yellow: #e3b341` — syntax colors

**Custom CSS utilities** (defined in `app/globals.css`):

- `.crt-scanlines` — scanline overlay effect (`::before` pseudo)
- `.terminal-glow` — green glow box-shadow
- `.text-glow-green` / `.text-glow-blue` — text shadow for headings
- `.animate-fade-up` — fade+slide entrance (0.6s)
- `.delay-100` ~ `.delay-3000` — animation stagger delay utilities
- `.cursor-blink` — blinking cursor (step-end 1s)
- `.neo-card` — hover: translate(-8px,-8px) + white offset shadow
- `.grid-lines-bg` — horizontal code-aesthetic grid lines
- `.gradient-border` — green→blue gradient border via `::before`
- `.noise-bg` — subtle noise texture overlay
- `.syntax-keyword/string/function/number/comment/variable/tag` — code syntax colors
- `.terminal-input` — placeholder: `rgba(110,118,129,0.35)`

## Typography

- **DungGeunMo** — Korean pixel font, loaded via CDN in `app/layout.tsx`, applied to `body`
- **Geist Sans / Geist Mono / Space Mono** — via `next/font/google`

## Routes

완료:
- `/` — Homepage (scroll snap 2섹션: `TerminalHero` hero + `ToolsLanding` tools grid)
- `/about` — About page
- `/contact` — Contact page
- `/privacy-policy` — Privacy Policy
- `/terms` — Terms of Service
- `/tools/json-formatter` — JSON Formatter & Validator
- `/tools/regex-tester` — Regex Tester
- `/tools/text-diff` — Text Diff Tool
- `/tools/base64` — Base64 Encoder/Decoder
- `/tools/jwt-decoder` — JWT Decoder
- `/tools/uuid-generator` — UUID Generator
- `/tools/hash-generator` — Hash Generator
- `/tools/yaml-to-json` — YAML ↔ JSON Converter
- `/tools/url-encoder` — URL Encoder/Decoder

개발 예정:
- `/tools/timestamp-converter` — Timestamp Converter
- `/tools/cron-parser` — Cron Expression Parser
- `/tools/color-converter` — Color Converter
- `/tools/number-base-converter` — Number Base Converter
- `/tools/string-case-converter` — String Case Converter
- `/tools/markdown-preview` — Markdown Preview

## Tools Roadmap

개발 완료 (9개):

- **JSON Formatter** — 포맷/검증/Auto-fix/Minify, Tree view, Diff view
- **Regex Tester** — 실시간 매칭 하이라이트, 플래그 토글, 캡처 그룹, ₩→\\ 자동변환
- **Text Diff** — Split/Unified view, 공백 무시, paren-aware 인라인 diff
- **Base64** — Text/URL Safe/Image 3탭, btoa/atob (외부 패키지 없음)
- **JWT Decoder** — Header/Payload/Signature, exp 카운트다운, alg:none 경고, HMAC + PEM 비대칭 검증 (Web Crypto API)
- **UUID Generator** — v1/v4/v7, 개수/포맷/하이픈 옵션, Copy All (crypto.randomUUID)
- **Hash Generator** — MD5/SHA-1/SHA-256/SHA-384/SHA-512, HMAC, 파일 해시 지원
- **YAML ↔ JSON Converter** — 양방향 변환, 구문 강조, 파일 업로드/다운로드
- **URL Encoder/Decoder** — encodeURIComponent 기반 인코딩/디코딩, Query String Parser 탭 (key/value 테이블, 개별 Copy)

개발 예정 (우선순위 순):

1. **Timestamp Converter** — Unix timestamp ↔ 날짜/시간, 타임존 지원
2. **Cron Expression Parser** — Cron 파싱, 다음 실행 시간 미리보기
3. **Color Converter** — HEX ↔ RGB ↔ HSL ↔ OKLCH 변환
4. **Number Base Converter** — 2진/8진/10진/16진 변환
5. **String Case Converter** — camelCase ↔ snake_case ↔ kebab-case ↔ PascalCase
6. **Markdown Preview** — 실시간 Markdown 렌더링 미리보기

## Components

- `components/hero/terminal-hero.tsx` — **Client**, typewriter animation + "Explore Our Tools" Terminal Border 버튼 (hover: 초록 fill) + 바운스 chevron
- `components/home-wrapper.tsx` — **Client**, scroll snap 컨테이너 (`scrollSnapType: y mandatory`), body overflow 제어
- `components/landing/tools-landing.tsx` — **Server**, 9개 툴 hover-effect 그리드 + 6개 coming soon 섹션 (lucide-react 아이콘)
- `components/layout/navbar.tsx` — Fixed top navbar (server)
- `components/layout/footer.tsx` — **Client**, site-wide footer
- `components/layout/tool-nav-sidebar.tsx` — Tool navigation sidebar (server), 9개 도구 링크
- `components/tools/json-formatter/json-formatter-client.tsx` — **Client** (jsonrepair)
- `components/tools/regex-tester/regex-tester-client.tsx` — **Client**
- `components/tools/text-diff/text-diff-client.tsx` — **Client** (diff 라이브러리)
- `components/tools/base64/base64-client.tsx` — **Client**
- `components/tools/jwt-decoder/jwt-decoder-client.tsx` — **Client**
- `components/tools/uuid-generator/uuid-generator-client.tsx` — **Client**
- `components/tools/hash-generator/hash-generator-client.tsx` — **Client**
- `components/tools/yaml-to-json/yaml-to-json-client.tsx` — **Client**
- `components/tools/url-encoder/url-encoder-client.tsx` — **Client**
- `components/contact/contact-form-client.tsx` — **Client**, Google Sheets 연동 폼 (GAS fetch, `no-cors`), Email/Type/Feature Request 필드
- `components/ui/` — shadcn components

## Key Dependencies

- `jsonrepair` — JSON Auto-fix
- `diff` — Text Diff 연산
- `highlight.js` — 코드 하이라이팅
- `js-yaml` — YAML 파싱 (YAML ↔ JSON 변환)
- `lucide-react` — 아이콘
- `radix-ui` — 헤드리스 UI primitives (shadcn 기반)

## Data / Lib

- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)

## Tailwind v4 Notes

- Uses `@tailwindcss/postcss` — no `tailwind.config.js`
- Tokens mapped via `@theme inline` block in `globals.css`
- Dark mode: `@custom-variant dark (&:is(.dark *))`
- All colors in oklch color space
