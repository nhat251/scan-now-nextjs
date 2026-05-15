# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`scan-now` — A Next.js 16 (App Router) portfolio site template for Nguyen Sinh Nhat. Built with TypeScript, Tailwind CSS v4, and shadcn/ui (new-york style).

## Important Rules (Read First)

### SSR / Server Components (Next.js App Router)

- All components are **Server Components by default** — do NOT add `"use client"` unless you need browser APIs (`useState`, `useEffect`, event handlers, refs)
- Push `"use client"` boundaries as deep as possible. Compose: Server Component (data fetch) → Client Component (interactivity)
- Data fetching: prefer `async` Server Components over client-side fetching for initial data
- Never import `"use client"` components directly into server-only code (e.g., `route.ts`, server actions) without proper boundary
- Use `next-intl/server` functions (`getMessages`, `getTranslations`) only in Server Components or `async` functions

### Client/Server Boundary Pattern

- Server-side providers: `NextIntlProvider` (`src/providers/global/next-intl.tsx` — uses `await getMessages()` from `next-intl/server`)
- Client-side providers: `ReactQueryProvider` (marked `"use client"`)
- `axiosBasic` (`src/services/axiosBasic.tsx`) uses `localStorage` → **browser-only** → must NOT run in server context

### Custom Hooks Pattern

**Mutations** (`src/hooks/useMutation.tsx`):
- Use for all API mutations — auto-manages loading spinner and error toasts
- Config: `hasLoading: true` shows global loading, `onSuccess`/`onError` for custom callbacks

**Queries** (`src/hooks/useQuery.ts`):
- Use for all API queries — same loading/toast/notify pattern as `useMutation`
- Config: `hasLoading`, `notifySuccess`/`notifyError` (message + duration), `onSuccess`/`onError`, `enabled`

## Essential Commands

```bash
pnpm dev          # Start dev server (localhost:3000)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # ESLint + TypeScript type check (zero warnings allowed)
pnpm lint:fix     # Auto-fix ESLint + type check
```

No test framework is configured.

## Architecture

### Directory Structure (`src/`)

```
src/
├── app/              # Next.js App Router routes
├── components/       # Atomic Design: atoms/ molecules/ organisms/ globals/ icons/ ui/
├── constants/        # Site config, route paths, style constants
├── data/             # Static data, SEO metadata, toast messages
├── helpers/          # Utility functions (slug, time, scroll)
├── hooks/            # React hooks + TanStack Query mutations/queries
├── i18n/             # next-intl (Vietnamese default, English supported)
├── lib/              # Core utilities: cn(), uuid(), logging
├── providers/        # Context providers (theme, i18n, React Query)
├── services/         # API layer (Axios with JWT interceptor)
├── stores/           # Zustand stores (global state, user auth)
├── styles/           # Tailwind CSS v4 globals.css
└── types/            # TypeScript type definitions
```

### Key Patterns

**Component Organization:** Atomic Design methodology.

- `atoms/` → smallest units (dividers, buttons)
- `molecules/` → composed groups (modals, nav items)
- `organisms/` → complex compositions (currently empty)
- `globals/` → site-wide (header, footer, loading, toast)
- `ui/` → shadcn/ui primitives

**State Management:**

- Zustand for global state (`src/stores/`) — `global` store (loading, toasts), `user` store (auth)
- TanStack Query v5 for server state with custom `useMutation` wrapper (`src/hooks/useMutation.tsx`) that auto-manages loading spinner and error toasts

**API Layer:**

- Axios instance at `src/services/axiosBasic.tsx` with automatic JWT token injection
- Mutations organized in `src/hooks/mutations/`, queries in `src/hooks/queries/`
- **Query keys:** Centralized in `src/constants/queryKeys.ts` — use constants for `queryKey` arrays, never inline strings
- **Query hooks:** Follow `useSampleQuery` pattern — export a typed hook wrapping `useQuery` with `queryKey`, `queryFn`, optional `select`

**Providers (in `src/app/layout.tsx`):**
`NextIntlProvider` wraps everything inside. `ReactQueryProvider` wraps `Header → children → Footer → ScrollToTopButton`. `GlobalToast` and `GlobalLoading` are inside `NextIntlProvider` but outside `ReactQueryProvider`.

**Path Aliases (tsconfig.json):**
`@/*` → `src/*`, `@/components/*` → `src/components/*`, `@/ui/*` → `src/components/ui/*`, `@/hooks/*` → `src/hooks/*`, `@/lib/*` → `src/lib/*`

### Code Style Rules

- **No default exports** except for Next.js pages/layouts/components and `useMutation` hook
- **Import order** (enforced by `simple-import-sort`): react/next → external packages → `@/` aliases → relative imports → styles
- **`import type`** for type-only imports (`@typescript-eslint/consistent-type-imports` enforced)
- **No parent relative imports** (e.g., `../../`), use `@/` path aliases
- Conventional Commits format (feat, fix, docs, refactor, etc.)
- Pre-commit: lint-staged runs `pnpm lint` on staged `.ts`/`.tsx`/`.js` files

### Key Dependencies

- **UI:** shadcn/ui (new-york), Radix UI, Tailwind CSS v4, lucide-react
- **Forms:** React Hook Form + Zod
- **Auth:** next-auth v4 (Google OAuth)
- **i18n:** next-intl
- **Animations:** embla-carousel, react-animated-cursor
- **Charts:** echarts
- **Integrations:** Strapi CMS (localhost:1337), HubSpot, Slack, Resend (email), Google Analytics

### React Compiler

Enabled via native `reactCompiler: true` in `next.config.ts` (Next.js 16).

### Next.js Config Notes

- `output: "standalone"` — Docker-friendly standalone output
- Image `remotePatterns`: Strapi CMS (`localhost:1337/uploads/**`), Google avatars (`lh3.googleusercontent.com`)

### Environment Variables

- `NEXT_PUBLIC_API_URL` — Backend API base URL (used by `axiosBasic`)
- `GOOGLE_ANALYTICS_MEASUREMENT_ID` — Optional GA tracking ID

### Utilities

**Helpers (`src/helpers/`):**
- `createSlug.tsx` — string → URL-safe slug
- `scrollToElement.ts` — smooth scroll utilities
- `time.tsx` — time formatting

**Lib (`src/lib/`):**
- `utils.ts` — `cn()` (clsx + tailwind-merge), `uuid()`
- `log.ts` — Consola-based tagged logging (`Log.info()`, `Log.error()`, etc.)

### Query Keys

Centralized in `src/constants/queryKeys.ts`. Use these constants for `queryKey` arrays — never inline strings.

### Query Hook Pattern

Follow `src/hooks/queries/useSampleQuery.tsx` — export a typed hook wrapping `useQuery`:
- `queryKey` from `QUERY_KEY` constants
- `queryFn` using `axiosBasic`
- `select: (res) => res.data` for data extraction
- Optional `hasLoading`, `notifySuccess`/`notifyError`, `onSuccess`/`onError` callbacks
