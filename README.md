# PayPilot

> Enterprise-Ready Payment Infrastructure Frontend  
> Production-grade SaaS architecture built to demonstrate scalable frontend engineering, performance optimization, and modern React best practices.

PayPilot is a fintech SaaS frontend application designed to reflect how real-world startup and scale-up dashboards are architected and shipped.

This project showcases my ability to design and implement:

- Scalable frontend architecture
- Performance-optimized React applications
- Type-safe systems with TypeScript
- Clean and reusable design systems
- Accessibility-compliant interfaces (WCAG-aligned)
- Production-ready routing and state management
- Defensive engineering patterns

---

# Executive Summary

PayPilot simulates a modern payment infrastructure platform consisting of:

1. High-converting marketing landing page
2. Authenticated analytics dashboard

The application is structured the way production SaaS applications are built — modular, maintainable, and extensible.

This is not just a UI showcase. It reflects real engineering decisions.

---

# Product Scope

| Module | Purpose | Business Value |
|--------|----------|----------------|
| Landing | Conversion-focused marketing | User acquisition |
| Authentication | Session simulation | Access control structure |
| Dashboard | Analytics & transactions | Data-driven insights |
| State Management | Auth & theme persistence | UX continuity |
| API Layer | Mock async services | Backend-ready abstraction |

---

# Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Framework | React 19 | Concurrent-ready, modern hooks |
| Language | TypeScript 5.9 | Strict typing, scalability |
| Styling | Tailwind CSS v4 | Utility-first with design tokens |
| State | Zustand 5 | Lightweight, selective subscriptions |
| Routing | React Router v7 | Nested routes, scalable |
| Charts | Recharts 3 | Declarative data visualization |
| Motion | Framer Motion 12 | Layout & gesture animations |
| Build Tool | Vite 7 | Fast dev server & optimized builds |

This stack reflects what I would confidently ship in production.

---

# Architecture Overview

The application follows scalable SaaS patterns.

App Structure:

App.tsx  
 ├── ThemeSync  
 ├── Routes (lazy-loaded)  
 ├── ErrorBoundary  
 └── ProtectedRoute  

Routing Strategy:

- Landing and Login load eagerly
- Dashboard and heavy modules lazy-loaded
- ErrorBoundary isolates runtime failures
- ProtectedRoute enforces authentication gating

This approach reduces initial bundle size and improves performance.

---

# Folder Structure

```
src/
├── components/
│   ├── ui/                  # Stateless design system primitives
│   ├── dashboard/           # Dashboard-specific components
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
│   └── DashboardLayout.tsx
├── pages/
│   ├── Home.tsx
│   ├── Login.tsx
│   └── dashboard/
│       ├── Analytics.tsx
│       └── Transactions.tsx
├── services/
│   └── api.ts
├── store/
│   ├── useAuthStore.ts
│   └── themeStore.ts
├── App.tsx
├── main.tsx
└── index.css
```

Architecture Principles:

- UI primitives are stateless and reusable
- Route-level components manage data fetching
- API abstraction isolated in services/
- Global state isolated in store/
- Clear separation of concerns
- Ready for backend integration

---

# State Management Strategy

Zustand is used for global state.

Stores:

| Store | Persisted | Responsibility |
|--------|------------|----------------|
| useAuthStore | Yes | Authentication & session state |
| themeStore | Yes | Theme preference & hydration |

Why Zustand:

- Minimal boilerplate
- Small bundle footprint
- Selective reactivity
- Built-in persistence middleware
- Avoids unnecessary global complexity

Theme hydration is handled before React mounts to prevent flash of incorrect theme (FOUC).

---

# Performance Engineering

Performance was intentionally considered during implementation.

Optimizations:

- Route-based code splitting via React.lazy
- Suspense fallbacks for chunk loading
- Memoization for filtered & paginated data
- Debounced search (300ms)
- Reusable generic Table component
- Skeleton loaders during API simulation
- Error boundaries to prevent full app crashes

Production bundle separation:

- Landing kept lightweight
- Analytics chunk isolated (Recharts-heavy)
- Transactions lightweight
- API abstraction separated

This mirrors real SaaS optimization strategies.

---

# Accessibility

Accessibility was treated as a core engineering requirement.

- Semantic HTML structure
- ARIA labels for interactive controls
- Keyboard navigability
- Focus-visible states
- No clickable div anti-patterns
- WCAG-aligned contrast awareness

The project is structured to pass accessibility audits.

---

# API Abstraction Layer

services/api.ts simulates backend behavior using:

- Promise-based responses
- Artificial latency (800ms)
- Typed data contracts

This design allows seamless migration to:

- REST APIs
- GraphQL
- tRPC
- Microservice-based backends

Minimal refactor required.

---

# Quality & Standards

After building for production:

```bash
npm run build
npm run preview
```

Intended quality targets:

- Strong Lighthouse performance score
- High accessibility score
- Zero console errors
- Clean semantic markup
- Production-optimized bundles

---

# Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Demo authentication is enabled for portfolio review.

---

# Roadmap (Enterprise-Ready Expansion)

- React Query / SWR integration
- Real backend integration
- Role-based access control
- Subscription & billing system
- Unit & E2E testing (Vitest + RTL + Playwright)
- Lighthouse CI automation
- Internationalization (i18n)
- Progressive Web App support
- Micro-frontend readiness

---

# About the Developer

Hritik Raghuwanshi  
Frontend Software Engineer  

Specialization:

- React Ecosystem
- TypeScript Architecture
- Performance Optimization
- Scalable SaaS Frontends
- Clean UI Systems
- Product-Focused Engineering

PayPilot reflects how I approach frontend engineering in production environments — building scalable systems, not just components.