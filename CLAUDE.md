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
- **CSS variables**: All design tokens (colors, radius, sidebar, chart) are defined as CSS custom properties in `app/globals.css` with light/dark variants using oklch color space
- **Dark mode**: Class-based dark mode via `.dark` class (custom variant defined in `globals.css`)
- **Fonts**: Geist Sans (`--font-geist-sans`) and Geist Mono (`--font-geist-mono`) loaded via `next/font/google`

### Structure

- `app/` — Next.js App Router pages and layouts
- `app/globals.css` — Global styles, Tailwind imports, and all CSS variable tokens
- `lib/utils.ts` — `cn()` helper
- `components/ui/` — shadcn/ui generated components (added via CLI)
- `components/` — Custom application components

## Design System

Always dark — no light mode toggle.

**CRT Terminal Theme:**
- `--terminal-bg: #0a0e1a` — page background
- `--terminal-green: #00ff88` — primary accent
- `--electric-blue: #58a6ff` — secondary accent
- `--comment-gray: #6e7681` — muted text

**Custom CSS utilities** (defined in `app/globals.css`):
- `.crt-scanlines` — scanline overlay effect
- `.terminal-glow` — green glow box-shadow
- `.text-glow-green` — text shadow for headings
- `.animate-fade-up` — entrance animation
- `.cursor-blink` — blinking cursor
- `.neo-card` — card with terminal border style

## Typography

- **DungGeunMo** — Korean pixel font, loaded via CDN in `app/layout.tsx`, applied to `body`
- **Geist Sans** (`--font-geist-sans`), **Geist Mono** (`--font-geist-mono`), **Space Mono** (`--font-space-mono`) — via `next/font/google`

## Routes

- `/` — Homepage with `TerminalHero` + features section
- `/about` — About page (PSWK DEV 팀 소개, 미션)
- `/contact` — Contact page (이메일 + 버그 리포트 가이드)
- `/privacy-policy` — Privacy Policy (AdSense 필수)
- `/terms` — Terms of Service
- `/tools/json-formatter` — JSON Formatter & Validator (완료)
- `/tools/regex-tester` — Regex Tester (완료)
- `/tools/text-diff` — Text Diff Tool (완료)
- `/tools/base64` — Base64 Encoder/Decoder (완료)
- `/tools/jwt-decoder` — JWT Inspector (완료)
- `/tools/uuid-generator` — UUID Generator (개발예정 1순위)
- `/tools/hash-generator` — Hash Generator (개발예정 2순위)

## Tools Roadmap

개발 완료:
- **JSON Formatter** (`/tools/json-formatter`) — 포맷/검증/Auto-fix/Minify, Tree view (expand/collapse, path copy, search), Diff view
- **Regex Tester** (`/tools/regex-tester`) — 실시간 매칭 하이라이트, 플래그 토글, 캡처 그룹 표시, ₩→\\ 자동변환
- **Text Diff** (`/tools/text-diff`) — Split/Unified view, 라인별 diff, 공백 무시 옵션, 괄호 그룹 단위 인라인 diff (paren-aware tokenizer + diffArrays), Unified view 전체 추가/삭제 줄 mark 하이라이트
- **Base64** (`/tools/base64`) — Text/URL Safe/Image 3탭, 브라우저 내장 btoa/atob 사용 (외부 패키지 없음)
- **JWT Inspector** (`/tools/jwt-decoder`) — Header/Payload/Signature 분리, exp 라이브 카운트다운, alg:none 보안 경고, HS256/384/512 HMAC 검증 + RS256/384/512·PS256/384/512·ES256/384/512 비대칭 PEM 공개키 검증 (Web Crypto API, 외부 라이브러리 없음)

개발 예정 (순서대로):
1. **UUID Generator** (`/tools/uuid-generator`)
2. **Hash Generator** (`/tools/hash-generator`)

AdSense 심사 대응 완료 (2026-03-01):
- `/about`, `/contact`, `/privacy-policy`, `/terms` 페이지 추가
- `components/layout/footer.tsx` 추가 (app/layout.tsx에 포함)
- 각 도구 페이지 하단에 교육용 설명 섹션 추가
- `public/ads.txt` 생성 (publisher ID 교체 필요)

## Components

- `components/hero/terminal-hero.tsx` — **Client**, typewriter animation + tool CTA buttons
- `components/layout/navbar.tsx` — Fixed top navbar (server)
- `components/layout/footer.tsx` — **Client**, site-wide footer (About/Contact/Privacy/Terms 링크, © 2026 PSWK DEV)
- `components/layout/tool-nav-sidebar.tsx` — Tool navigation sidebar (server)
- `components/tools/json-formatter/json-formatter-client.tsx` — **Client**, JSON formatter (jsonrepair)
- `components/tools/regex-tester/regex-tester-client.tsx` — **Client**, Regex tester
- `components/tools/text-diff/text-diff-client.tsx` — **Client**, Text diff (diffLines + diffArrays, paren-aware 인라인 diff)
- `components/tools/base64/base64-client.tsx` — **Client**, Base64 encoder/decoder (Text, URL Safe, Image 3탭)
- `components/tools/jwt-decoder/jwt-decoder-client.tsx` — **Client**, JWT Inspector (Header/Payload/Signature 카드, 실시간 exp 카운트다운, alg:none 보안 경고, HMAC + 비대칭 PEM 서명 검증)
- `components/ui/` — shadcn components (none installed yet; add via `pnpm dlx shadcn@latest add <name>`)

## Key Dependencies

- `jsonrepair` — JSON Auto-fix 기능
- `diff` — Text Diff 연산
- `highlight.js` — 코드 하이라이팅
- `lucide-react` — 아이콘
- `radix-ui` — 헤드리스 UI primitives (shadcn 기반)

## Data / Lib

- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)

## Tailwind v4 Notes

- Uses `@tailwindcss/postcss` — no `tailwind.config.js`
- Tokens mapped via `@theme inline` block in `globals.css`
- Dark mode: `@custom-variant dark (&:is(.dark *))`
- All colors in oklch color space
