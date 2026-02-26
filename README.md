# PayPilot

**Modern payment infrastructure for startups and scale-ups.**

A production-grade fintech SaaS frontend demonstrating scalable architecture, performance awareness, and product-level polish. Built as a portfolio showcase with a premium landing page and a fully functional analytics dashboard.

---

## Project Overview

PayPilot is a two-phase application:

| Phase | Scope | Purpose |
|-------|-------|---------|
| **Landing** | Hero, Features, Pricing, Testimonials, FAQ, Footer | Marketing and conversion |
| **Dashboard** | Analytics, Transactions, Auth | App experience for logged-in users |

The codebase is structured for real-world shipping: design systems, route-based code splitting, error boundaries, accessibility (WCAG AA), and defensive programming patterns.

---

## Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Framework** | React 19 | Concurrent features, modern hooks |
| **Language** | TypeScript 5.9 | Type safety, better DX |
| **Styling** | Tailwind CSS v4 | Utility-first, design tokens |
| **State** | Zustand 5 | Minimal boilerplate, built-in persist |
| **Routing** | React Router v7 | Nested routes, loaders-ready |
| **Charts** | Recharts 3 | Declarative, composable |
| **Motion** | Framer Motion 12 | Layout animations, gestures |
| **Build** | Vite 7 | Fast HMR, optimized output |

---

## Architecture

### High-Level Flow

```
┌─────────────────────────────────────────────────────────────┐
│                         App.tsx                              │
│  ThemeSync │ Routes (lazy) │ ErrorBoundary │ ProtectedRoute  │
└─────────────────────────────────────────────────────────────┘
         │
         ├── / ──────────────► Home (Landing)
         ├── /login ─────────► Login
         └── /dashboard ──────► DashboardLayout
                                    │
                                    ├── /analytics ───► Analytics (lazy)
                                    └── /transactions ► Transactions (lazy)
```

- **Landing** and **Login** load eagerly.
- **Dashboard** and its child routes are lazy-loaded with `React.lazy` and `Suspense`.
- **ErrorBoundary** wraps the dashboard to catch runtime errors and show a fallback.
- **ThemeSync** applies `dark` class and body styles from persisted theme.

### Data Flow

- **Auth** and **Theme** are persisted to `localStorage` via Zustand `persist`.
- **Dashboard data** (Analytics, Transactions) is fetched from `src/services/api.ts`—a simulated API layer with `Promise` + `setTimeout` (800ms delay).
- No global data cache; each page fetches on mount. Ready for React Query or SWR when wired to a real backend.

---

## Folder Structure

```
src/
├── components/           # Shared UI
│   ├── ui/              # Design system primitives
│   │   ├── Button.tsx       # Primary, secondary, ghost + ButtonLink
│   │   ├── Card.tsx
│   │   ├── Container.tsx    # max-w-7xl mx-auto px-6 md:px-20
│   │   ├── Section.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Table.tsx        # Generic table (columns, data, renderCell)
│   │   ├── AnalyticsSkeleton.tsx
│   │   └── index.ts
│   ├── dashboard/       # Dashboard-specific
│   │   ├── Sidebar.tsx
│   │   └── TopNavbar.tsx
│   ├── ErrorBoundary.tsx
│   ├── ThemeSync.tsx
│   ├── ProtectedRoute.tsx
│   ├── PageLoader.tsx
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── Pricing.tsx
│   ├── Testimonials.tsx
│   ├── FAQ.tsx
│   ├── Footer.tsx
│   ├── Stats.tsx
│   ├── TrustedCompanies.tsx
│   └── DashboardPreview.tsx
├── layouts/
│   └── DashboardLayout.tsx   # Sidebar + TopNavbar + Outlet
├── pages/
│   ├── Home.tsx
│   ├── Login.tsx
│   └── dashboard/
│       ├── Analytics.tsx    # Charts, stats, API-driven
│       └── Transactions.tsx # Table, search, filters, pagination
├── services/
│   └── api.ts               # fetchTransactions, fetchAnalytics (simulated)
├── store/
│   ├── useAuthStore.ts      # Auth state (persisted)
│   └── themeStore.ts        # Theme preference (persisted)
├── App.tsx
├── main.tsx
└── index.css
```

### Conventions

- **`components/ui/`** — Stateless, reusable primitives. No business logic.
- **`components/dashboard/`** — Dashboard-only layout pieces.
- **`pages/`** — Route-level components. May contain local state and data fetching.
- **`services/`** — API clients and data-fetching logic.
- **`store/`** — Global state (auth, theme). Persisted where needed.

---

## State Management

Zustand is used for global state. No Redux, no Context providers.

### Stores

| Store | Key | Persisted | Purpose |
|-------|-----|-----------|---------|
| `useAuthStore` | `paypilot-auth` | Yes | `isAuthenticated`, `user`, `login`, `logout` |
| `themeStore` | `paypilot-theme` | Yes | `theme`, `toggleTheme` |

### Why Zustand

- **Small API** — `create`, `persist`, selectors. No boilerplate.
- **Selective subscriptions** — Components re-render only when selected state changes.
- **Persistence** — `persist` middleware syncs to `localStorage` automatically.
- **Bundle size** — ~1KB vs Redux’s larger footprint.

### Theme Hydration

An inline script in `index.html` runs before React and reads `localStorage.getItem('paypilot-theme')` to set the `dark` class on `<html>`. This prevents a flash of the wrong theme on load.

---

## Performance Optimizations

| Optimization | Implementation |
|--------------|----------------|
| **Route-based code splitting** | `React.lazy` for `DashboardLayout`, `Analytics`, `Transactions` |
| **Suspense fallbacks** | `PageLoader` skeleton during chunk load |
| **Memoization** | `useMemo` for filtered/paginated transactions |
| **Debounced search** | 300ms debounce on transaction ID search |
| **Generic Table** | Reusable `Table<T>` with column definitions and render functions |
| **Memoized rows** | `TransactionRow` removed in favor of `Table` render functions |
| **Skeleton loaders** | Analytics and Transactions show skeletons during API “load” |

### Bundle Output (production)

```
index-*.js          ~395 KB (main + landing)
Analytics-*.js      ~369 KB (Recharts-heavy)
Transactions-*.js   ~7.7 KB
DashboardLayout-*.js ~3 KB
api-*.js            ~1.5 KB
```

---

## Accessibility

- **ARIA** — `aria-label` on icon buttons, filters, pagination, search
- **Keyboard** — All interactive elements focusable; `focus-visible` rings
- **Semantics** — `<button>` for actions, `<a>` for navigation; no clickable divs
- **Contrast** — Text meets WCAG AA where applicable
- **Landmarks** — `main`, `nav`, `aria-label` on sections

---

## Future Improvements

- [ ] **Real API** — Replace `services/api.ts` with REST/GraphQL client
- [ ] **Data cache** — React Query or SWR for server state
- [ ] **Tests** — Vitest + React Testing Library (unit), Playwright (E2E)
- [ ] **Lighthouse CI** — Automated performance and a11y checks
- [ ] **Subscription management** — Billing, plans, usage
- [ ] **Settings & profile** — User preferences, team management
- [ ] **i18n** — Multi-language support
- [ ] **PWA** — Service worker, offline support

---

## Lighthouse Score

Run a Lighthouse audit after building:

```bash
npm run build && npm run preview
```

Then open Chrome DevTools → Lighthouse → Analyze page load.

| Category | Expected | Notes |
|----------|----------|-------|
| **Performance** | — | Code splitting, lazy loading, minimal main bundle |
| **Accessibility** | — | ARIA, focus-visible, semantic HTML |
| **Best Practices** | — | Error boundaries, HTTPS, no console errors |
| **SEO** | — | Semantic structure, meta tags |

*Replace `—` with actual scores after running the audit.*

---

## Getting Started

```bash
# Install
npm install

# Dev
npm run dev

# Build
npm run build

# Preview production build
npm run preview
```

**Demo auth:** The app auto-logs in as `demo@paypilot.io` for convenience. Use `/login` to sign out or switch users (any email/password works in demo mode).

---

*Built with a focus on scalable architecture, performance awareness, and production mindset.*
