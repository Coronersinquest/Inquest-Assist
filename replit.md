# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── inquest-guide/      # React + Vite frontend app
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts
├── pnpm-workspace.yaml     # pnpm workspace
├── tsconfig.base.json      # Shared TS options
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## Apps

### Inquest Preparation Guide (`artifacts/inquest-guide`)

A web app helping healthcare professionals prepare for coroner's inquests in England and Wales.

**Features:**
- Dashboard with course overview and progress tracking
- 4 learning sections with educational content:
  1. The Purpose of an Inquest (coroner's court, 4 questions, PIRH, juries, Rule 23)
  2. Request for a Statement (what to include, dos/don'ts, tips)
  3. Attending as a Witness (GMC guidance, witness types, on the day tips)
  4. Post Inquest (conclusions, Regulation 28, handling criticism)
- True/False knowledge quizzes per section with explanations
- Pre-court preparation checklist
- Progress tracking stored in PostgreSQL

**Content section IDs:** `purpose`, `statement`, `witness`, `post-inquest`

**Quiz question IDs:** `s1-q1`, `s1-q2`, `s1-q3`, `s2-q1`, etc.

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server with routes:
- `GET /api/healthz` — health check
- `GET /api/progress` — get user progress (session-based)
- `POST /api/progress` — update section progress
- `POST /api/quiz` — submit quiz answer, get correctness + explanation

### `lib/db` (`@workspace/db`)

Database layer. Schema: `section_progress` table (session_id, section_id, completed, quiz_score, last_visited).

- `pnpm --filter @workspace/db run push` — push schema changes

### `lib/api-spec` (`@workspace/api-spec`)

OpenAPI 3.1 spec + Orval codegen config.

Run codegen: `pnpm --filter @workspace/api-spec run codegen`
