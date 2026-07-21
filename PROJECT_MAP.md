# PROJECT_MAP.md

> Auto-generated. Last updated: 2026-07-21

## Architecture

```
Portfolio/
├── server/                    # Express backend (Node.js)
│   ├── index.js               # Server entry point (port 3001)
│   ├── schema.sql             # Supabase SQL schema (projects + certificates)
│   ├── services/
│   │   ├── supabase.js        # Shared Supabase client (data layer)
│   │   └── cloudinary.js      # Cloudinary upload/delete helpers
│   ├── middleware/logger.js   # Morgan HTTP logging
│   ├── routes/
│   │   ├── projects.js        # GET/POST/PUT/DELETE /api/projects
│   │   ├── certificates.js    # GET/POST/DELETE /api/certificates
│   │   └── upload.js          # POST/DELETE /api/upload (Cloudinary)
│   ├── package.json           # Server dependencies
│   └── .env                   # Server env vars (Supabase + Cloudinary)
│
├── src/                       # React frontend
│   ├── main.jsx               # Entry point
│   ├── App.jsx                # Router: / , /project/:id, /admin
│   ├── api.js                 # API client (JSON + FormData upload)
│   ├── supabase.js            # Direct Supabase client (LEGACY - kept for backward compat)
│   ├── index.css              # Global styles + Tailwind
│   │
│   ├── Pages/
│   │   ├── Home.jsx           # Hero section
│   │   ├── About.jsx          # About + stats (via API)
│   │   ├── Portofolio.jsx     # Projects/Certs/Tech tabs (via API)
│   │   ├── Contact.jsx        # Contact form
│   │   └── Admin.jsx          # Admin dashboard (lazy-loaded)
│   │
│   └── components/
│       ├── admin/
│       │   ├── AdminProjects.jsx      # Project CRUD + file upload
│       │   └── AdminCertificates.jsx  # Certificate CRUD + file upload
│       ├── Navbar.jsx
│       ├── Background.jsx
│       ├── CardProject.jsx
│       ├── Certificate.jsx
│       ├── ProjectDetail.jsx  # Project detail (via API + localStorage fallback)
│       ├── SocialLinks.jsx
│       └── TechStackIcon.jsx
│
├── package.json               # Frontend dependencies + scripts
├── vite.config.js             # Vite config with /api proxy
├── tailwind.config.js
├── eslint.config.js           # Ignores dist/ and server/
├── netlify.toml               # Production deployment
└── .gitignore
```

## Data Flow

```
Frontend (React) ──HTTP──▶ Express API (/api/*)
                              │
                              ├── /api/projects        → Supabase (CRUD)
                              ├── /api/certificates    → Supabase (CRUD)
                              └── /api/upload          → Cloudinary (image storage)
                                    ├── POST (multipart/form-data) → upload image
                                    └── DELETE { imageRef }        → delete image
```

## API Endpoints

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| GET | /api/projects | — | List all projects |
| GET | /api/projects/count | — | Get project count |
| GET | /api/projects/:id | — | Get single project |
| POST | /api/projects | JSON | Create project |
| PUT | /api/projects/:id | JSON | Update project |
| DELETE | /api/projects/:id | — | Delete project |
| GET | /api/certificates | — | List all certificates |
| GET | /api/certificates/count | — | Get certificate count |
| POST | /api/certificates | JSON | Create certificate |
| DELETE | /api/certificates/:id | — | Delete certificate |
| POST | /api/upload | FormData (image, folder) | Upload image to Cloudinary |
| DELETE | /api/upload | { imageRef } | Delete image from Cloudinary |

## SQL Schema

See `server/schema.sql` — run in Supabase SQL Editor.

**projects** table:
- `id` UUID (PK, auto-generated)
- `Title` TEXT
- `Img` TEXT (Cloudinary URL)
- `Link` TEXT
- `Github` TEXT
- `Description` TEXT
- `TechStack` JSONB (array)
- `Features` JSONB (array)
- `created_at` TIMESTAMPTZ

**certificates** table:
- `id` UUID (PK, auto-generated)
- `Img` TEXT (Cloudinary URL)
- `created_at` TIMESTAMPTZ

## Environment Variables

### server/.env
```
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
PORT=3001
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

## NPM Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Runs both server (port 3001) and client (port 3000) concurrently |
| `npm run dev:client` | Vite dev server only |
| `npm run dev:server` | Express server only |
| `npm run build` | Production build (Vite) |
| `npm start` | Start production server |
| `npm run lint` | ESLint (excludes server/) |

## Routes

| Route | Component | Loading |
|-------|-----------|---------|
| `/` | LandingPage (Home + About + Portofolio + Contact) | Eager |
| `/project/:id` | ProjectDetail | Lazy |
| `/admin` | AdminPage (Projects + Certificates tabs) | Lazy |

## Deprecated / Removed

| Item | Status | Reason |
|------|--------|--------|
| `admin.html` | **Deleted** | Replaced by React AdminPage at `/admin` |
| Direct Supabase calls from frontend | **Deprecated** | All data fetching now goes through Express API |
| `src/supabase.js` | **Kept** | Retained for backward compatibility; no longer imported by Pages |
| Supabase Storage (portfolio-images bucket) | **Replaced** | Now using Cloudinary for image uploads |
| 13 unused npm packages | **Removed** | @react-spring/web, @splinetool/*, @headlessui/*, @heroicons/*, @shadcn/*, shadcn-ui, typewriter-effect, gsap, spline, dialog, add, headlessui |

## Known Issues

- `vendor-supabase` chunk is empty in build output (Supabase SDK is now server-only)
- `react-swipeable-views` has peer dep conflict with React 18 (uses `--legacy-peer-deps`)
- Pre-existing ESLint warnings: unused React imports, missing prop-types (not addressed in this change)
- `grid.svg` referenced in ProjectDetail.jsx not found at build time (runtime resolution)
