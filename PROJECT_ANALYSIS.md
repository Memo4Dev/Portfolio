# Project Analysis Report

## Overview

| Property | Value |
|----------|-------|
| **Project Name** | `portofolio-v5` |
| **Type** | Personal Portfolio Website (SPA) |
| **Primary Language** | JavaScript (JSX) |
| **Framework** | React 18.3 |
| **Build Tool** | Vite 5.4 |
| **Deployment** | Netlify |
| **Live URL** | [memo-portofoli.netlify.app](https://memo-portofoli.netlify.app/) |

---

## Directory Structure

```
Portfolio/
├── .env                        # Supabase credentials (env vars)
├── .gitignore                  # Ignores node_modules, /dist, .env
├── admin.html                  # Standalone admin dashboard (vanilla HTML/JS)
├── eslint.config.js            # ESLint 9 flat config
├── index.html                  # Main SPA entry point (Vite)
├── netlify.toml                # Netlify deployment config
├── package.json                # NPM manifest
├── postcss.config.js           # PostCSS (Tailwind + Autoprefixer)
├── robots.txt                  # SEO robots file
├── sitemap.xml                 # SEO sitemap
├── tailwind.config.js          # Tailwind CSS configuration
├── vite.config.js              # Vite build config (manual chunks)
│
├── public/                     # Static assets
│   ├── c++.svg
│   ├── css.svg
│   ├── html.svg
│   ├── javascript.svg
│   ├── Lottie.json
│   ├── nodejs.svg
│   ├── Photo.png               # Profile photo
│   └── react.svg
│
├── src/                        # Source code
│   ├── main.jsx                # React entry point
│   ├── App.jsx                 # Root component (Router + layout)
│   ├── index.css               # Global styles + Tailwind directives
│   ├── supabase.js             # Supabase client initialization
│   │
│   ├── Pages/                  # Page-level components
│   │   ├── Home.jsx            # Hero section with typing effect
│   │   ├── About.jsx           # About me + stats from Supabase
│   │   ├── Portofolio.jsx      # Projects/Certs/Tech Stack tabs
│   │   └── Contact.jsx         # Contact form + social links
│   │
│   └── components/             # Reusable UI components
│       ├── Background.jsx      # Animated floating gradient blobs
│       ├── CardProject.jsx     # Project card with image + links
│       ├── Certificate.jsx     # Certificate thumbnail + MUI modal
│       ├── InputField.jsx      # Reusable form input (unused)
│       ├── LoadingScreen.jsx   # Loading spinner (unused)
│       ├── Modal.jsx           # Project detail modal (unused)
│       ├── Navbar.jsx          # Fixed navbar with scroll tracking
│       ├── ProjectDetail.jsx   # Full project detail (lazy-loaded)
│       ├── SocialLinks.jsx     # Social media links grid
│       └── TechStackIcon.jsx   # Tech stack icon card
│
└── dist/                       # Production build output
    ├── index.html
    └── assets/                 # Bundled JS/CSS chunks
```

---

## Technology Stack

### Core

| Category | Technology | Version |
|----------|-----------|---------|
| Language | JavaScript (JSX) | ES2020+ |
| UI Library | React | 18.3.1 |
| Routing | React Router DOM | 6.28.0 |
| Build Tool | Vite | 5.4.10 |

### Styling

| Technology | Purpose |
|-----------|---------|
| Tailwind CSS 3.4 | Primary utility-first CSS framework |
| Material UI (MUI) 6.1 | Component library (Tabs, Modal, Icons) |
| Emotion 11 | CSS-in-JS (MUI styling engine) |
| Custom CSS | Keyframe animations, scrollbar styles |

### Animation Libraries

| Library | Usage |
|---------|-------|
| AOS (Animate On Scroll) | Scroll-triggered animations across all pages |
| Framer Motion 11 | Component animations |
| GSAP 3.12 | GreenSock animation platform |
| React Spring 9.7 | Spring physics animations |
| LottieFiles | Lottie animation player |
| Spline | 3D interactive elements |
| Typewriter Effect | Typing animation |

### Backend / Data

| Service | Purpose |
|---------|---------|
| Supabase | Database (projects, certificates) + Image storage |
| FormSubmit.co | Contact form email delivery |
| SweetAlert2 | Alert dialogs |

### Icons

| Library | Usage |
|---------|-------|
| Lucide React | Primary icon set |
| MUI Icons | Material Design icons |
| Heroicons | Tailwind ecosystem icons |

### Developer Tools

| Tool | Purpose |
|------|---------|
| ESLint 9 | Code linting (flat config) |
| Prettier | Code formatting (implied) |
| PostCSS | CSS processing |
| Autoprefixer | Vendor prefix automation |

---

## Build Configuration

### Vite (`vite.config.js`)

- **Dev Server**: Port 3000
- **Plugin**: `@vitejs/plugin-react`
- **Manual Chunk Splitting**:
  - `vendor-react`: react, react-dom, react-router-dom
  - `vendor-mui`: @mui/material, @mui/icons-material, @emotion/*
  - `vendor-supabase`: @supabase/supabase-js
  - `vendor-animations`: framer-motion, aos, react-swipeable-views
  - `vendor-lottie`: @lottiefiles/dotlottie-react
- **Chunk Size Warning**: 600 KB

### Tailwind (`tailwind.config.js`)

- **Content**: `./index.html`, `./src/**/*.{js,ts,jsx,tsx}`
- **Extended**: `backdropBlur.sm` → `4px`
- **Plugins**: None configured
- **Theme**: Dark mode default (`#030014` background)

### ESLint (`eslint.config.js`)

- Flat config format (ESLint 9)
- Plugins: react, react-hooks, react-refresh
- Targets: `**/*.{js,jsx}`

---

## NPM Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Start dev server on port 3000 |
| `build` | `vite build` | Production build with chunk splitting |
| `lint` | `eslint .` | Run ESLint on entire project |
| `preview` | `vite preview` | Preview production build locally |

---

## Dependencies

### Runtime Dependencies (30 packages)

| Package | Version | Purpose | Status |
|---------|---------|---------|--------|
| react | ^18.3.1 | UI library | Active |
| react-dom | ^18.3.1 | DOM renderer | Active |
| react-router-dom | ^6.28.0 | Client routing | Active |
| @mui/material | ^6.1.6 | UI components | Active |
| @mui/icons-material | ^6.1.6 | MUI icons | Active |
| @mui/styled-engine-sc | ^6.1.6 | Styled-components engine | Active |
| @emotion/react | ^11.13.3 | CSS-in-JS | Active |
| @emotion/styled | ^11.13.0 | Styled API | Active |
| @supabase/supabase-js | ^2.108.2 | Supabase client | Active |
| @lottiefiles/dotlottie-react | ^0.11.0 | Lottie animations | Active |
| framer-motion | ^11.15.0 | Animations | Active |
| aos | ^2.3.4 | Scroll animations | Active |
| lucide-react | ^0.454.0 | Icons | Active |
| sweetalert2 | ^11.15.0 | Alerts | Active |
| react-intersection-observer | ^9.13.1 | Viewport detection | Active |
| react-swipeable-views | ^0.14.0 | Swipeable tabs | Active |
| tailwind-merge | ^2.5.5 | Tailwind class merge | Active |
| clsx | ^2.1.1 | Conditional classes | Active |
| styled-components | ^6.1.13 | CSS-in-JS | Active |
| @react-spring/web | ^9.7.5 | Spring animations | **Unused** |
| @splinetool/react-spline | ^4.0.0 | 3D Spline | **Unused** |
| @splinetool/runtime | ^1.9.37 | Spline runtime | **Unused** |
| @headlessui/react | ^2.2.0 | Unstyled UI | **Unused** |
| @heroicons/react | ^1.0.6 | Heroicons | **Unused** |
| @shadcn/ui | ^0.0.4 | shadcn/ui | **Unused** |
| shadcn-ui | ^0.2.3 | shadcn/ui (legacy) | **Unused** |
| typewriter-effect | ^2.21.0 | Typing effect | **Unused** |
| gsap | ^3.12.5 | GSAP animations | **Unused** |
| spline | ^0.0.0 | Spline (empty) | **Unused** |
| dialog | ^0.3.1 | Dialog utility | **Unused** |
| add | ^2.0.6 | Accidental install | **Unused** |
| headlessui | ^0.0.0 | Empty placeholder | **Unused** |

### Dev Dependencies (12 packages)

| Package | Version | Purpose |
|---------|---------|---------|
| vite | ^5.4.10 | Build tool |
| @vitejs/plugin-react | ^4.3.3 | React Vite plugin |
| tailwindcss | ^3.4.14 | CSS framework |
| postcss | ^8.4.47 | CSS processing |
| autoprefixer | ^10.4.20 | Vendor prefixes |
| eslint | ^9.13.0 | Linter |
| @eslint/js | ^9.13.0 | ESLint config |
| eslint-plugin-react | ^7.37.2 | React rules |
| eslint-plugin-react-hooks | ^5.0.0 | Hooks rules |
| eslint-plugin-react-refresh | ^0.4.14 | Fast Refresh rules |
| globals | ^15.11.0 | Global variables |
| @types/react | ^18.3.12 | Type defs (editor) |
| @types/react-dom | ^18.3.1 | Type defs (editor) |
| tailwind-scrollbar | ^3.1.0 | Scrollbar plugin (not configured) |

---

## Architecture & Patterns

### Application Architecture

**Single-Page Application (SPA) with Section-Based Layout**

```
Landing Page (/):
┌─────────────────────────────────────────┐
│  Navbar (fixed)                          │
├─────────────────────────────────────────┤
│  AnimatedBackground (floating blobs)     │
├─────────────────────────────────────────┤
│  Home (Hero section)                     │
├─────────────────────────────────────────┤
│  About (Bio + Stats)                     │
├─────────────────────────────────────────┤
│  Portofolio (Tabs: Projects/Certs/Tech) │
├─────────────────────────────────────────┤
│  Contact (Form + Social Links)           │
└─────────────────────────────────────────┘

Project Detail (/project/:id):
┌─────────────────────────────────────────┐
│  Navbar (fixed)                          │
├─────────────────────────────────────────┤
│  ProjectDetail (lazy-loaded)             │
└─────────────────────────────────────────┘
```

### Routing

| Route | Component | Loading |
|-------|-----------|---------|
| `/` | Landing Page (all sections) | Eager |
| `/project/:id` | ProjectDetail | **Lazy** (`React.lazy`) |

### Data Flow

```
Supabase Database
       │
       ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Portofolio  │────▶│  localStorage │◀────│  About       │
│  (fetch +    │     │  (cache)      │     │  (read counts)│
│   cache)     │     └──────────────┘     └──────────────┘
└──────────────┘            │
                            ▼
                   ┌──────────────┐
                   │ ProjectDetail│
                   │ (read by id) │
                   └──────────────┘

Contact Form ──▶ FormSubmit.co ──▶ Email
```

### Component Patterns

1. **Functional Components Only** — No class components
2. **React.memo()** — Used extensively for performance:
   - `Home.jsx`: memoizes StatusBadge, MainTitle, TechStack, CTAButton, SocialLink
   - `About.jsx`: memoizes Header, ProfileImage, StatCard
3. **useCallback / useMemo** — Used for performance-critical computations
4. **Lazy Loading** — `React.lazy()` + `Suspense` for ProjectDetail route
5. **Code Splitting** — Manual chunk splitting in Vite config

### Styling Patterns

- **Tailwind-first**: Utility classes for all styling
- **Brand Gradient**: `from-[#6366f1] to-[#a855f7]` (indigo → purple)
- **Glassmorphism**: `bg-white/10 backdrop-blur-xl border border-white/10`
- **Dark Theme**: `bg-[#030014]` base background
- **MUI sx Prop**: Used in Certificate.jsx and Portofolio.jsx
- **Custom CSS Animations**: Defined in index.css and inline `<style>` blocks

### Animation Patterns

| Pattern | Implementation |
|---------|---------------|
| Scroll animations | AOS via `data-aos` attributes |
| Floating blobs | `requestAnimationFrame` + scroll position in Background.jsx |
| Typing effect | Custom useState/useEffect/useCallback in Home.jsx |
| CSS keyframes | `blob`, `float`, `pulse`, `spin-slower`, `shine` |
| Component transitions | Framer Motion |

### Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Component files | PascalCase | `CardProject.jsx` |
| Component exports | PascalCase | `export default function CardProject()` |
| Functions | camelCase | `fetchProjects()` |
| Variables | camelCase | `projectData` |
| CSS classes | Tailwind utilities | `bg-white/10 backdrop-blur-xl` |
| Pages directory | PascalCase | `Pages/` |
| Components directory | lowercase | `components/` |

---

## Deployment

### Netlify Configuration

```toml
[build]
  command = "npm install --legacy-peer-deps && CI=false npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18.20.6"
  NPM_VERSION = "10.8.2"

[build.processing]
  skip_processing = true
```

### SEO

| File | Purpose |
|------|---------|
| `robots.txt` | Allows all crawlers, references sitemap |
| `sitemap.xml` | Single page URL (lastmod: 2025-04-27) |
| `index.html` | Open Graph + Twitter Card meta tags |
| Google Site Verification | Meta tag in index.html |
| Poppins Font | Google Fonts integration |

### Admin Dashboard

- **File**: `admin.html` (standalone vanilla HTML/JS)
- **Purpose**: CRUD management for projects and certificates
- **Backend**: Connects directly to Supabase
- **Features**:
  - Add/edit/delete projects
  - Add/edit/delete certificates
  - Image upload to Supabase Storage bucket `portfolio-images`
- **Security Note**: Supabase credentials are hardcoded in the HTML

---

## Issues & Recommendations

### Critical Issues

| Issue | Severity | Description |
|-------|----------|-------------|
| Hardcoded Supabase credentials in `admin.html` | High | Security risk — credentials exposed in client-side HTML |
| `.env` file in repository | Medium | Should be in `.gitignore` only, verify it's not committed |

### Code Quality Issues

| Issue | Description |
|-------|-------------|
| Unused components | `InputField.jsx`, `Modal.jsx`, `LoadingScreen.jsx` exist but are not imported anywhere |
| Unused dependencies | ~13 packages are installed but never used (see dependency table above) |
| `tailwind-scrollbar` plugin | Installed as devDependency but not added to `tailwind.config.js` plugins |
| Inconsistent directory naming | `Pages/` (capitalized) vs `components/` (lowercase) |
| `admin.html` not integrated | Standalone page with duplicated styling, not part of React app |

### Performance Recommendations

| Recommendation | Impact |
|---------------|--------|
| Remove unused dependencies | Reduce install size and build time |
| Remove unused components | Reduce codebase complexity |
| Consolidate animation libraries | Using 5+ animation libraries is excessive — pick 1-2 |
| Configure `tailwind-scrollbar` | Or remove the dependency |
| Integrate admin into React app | Use React Router for `/admin` route |

### Security Recommendations

| Recommendation | Priority |
|---------------|----------|
| Move Supabase credentials to environment variables in admin.html | High |
| Ensure `.env` is not tracked in git history | High |
| Add authentication to admin dashboard | High |
| Rate limit contact form submissions | Medium |

### SEO Recommendations

| Recommendation | Priority |
|---------------|----------|
| Update `sitemap.xml` lastmod date | Medium |
| Add more pages to sitemap | Medium |
| Add structured data (JSON-LD) | Low |
| Add meta descriptions per page | Low |

---

## Summary

This is a **personal portfolio website** built as a React 18 Single-Page Application with Vite as the build tool. It features a dark-themed, glassmorphism design with extensive animations (AOS, Framer Motion, GSAP, custom CSS). The backend is powered by **Supabase** for data storage and image hosting, with **Netlify** for deployment.

The project is well-structured with clear separation between pages and components, uses modern React patterns (functional components, memo, lazy loading), and has optimized build output with manual chunk splitting. However, it suffers from **dependency bloat** (13+ unused packages), **unused components**, and a **security concern** with hardcoded Supabase credentials in the admin dashboard.

**Key Strengths:**
- Clean, modern React patterns
- Well-optimized Vite build with chunk splitting
- Consistent dark theme and glassmorphism design
- Supabase integration for dynamic content
- Good SEO basics (robots.txt, sitemap, Open Graph)

**Key Areas for Improvement:**
- Remove unused dependencies and components
- Address security issues in admin.html
- Consolidate animation libraries
- Integrate admin dashboard into the React app
