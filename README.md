# Stripe-SaaS-Pricing

A production-grade SaaS starter built around Stripe subscriptions, with a Next.js frontend and a NestJS backend in a pnpm + Turborepo monorepo.

## High-Level Architecture

```text
Internet
   │
Cloudflare
   │
Frontend (Next.js)
   │
Backend API (NestJS)
   │
PostgreSQL
   │
Redis
```

### Frontend Responsibilities (Next.js)

- UI and dashboards
- Authentication state and protected routes
- API communication
- Vendor dashboard
- Customer portal
- Payment checkout UI

### Backend Responsibilities (NestJS)

- Authentication (JWT, OAuth) and authorization (RBAC)
- Stripe and PayPal integrations
- API security and DTO validation
- Database access and business logic
- Audit logs
- Queue system, email system, and webhooks

## Production-Grade Principles

- TypeScript everywhere
- ESLint + Prettier + Husky
- Environment validation and DTO validation
- RBAC
- Modular architecture with repository/service pattern
- Docker for local infra
- Rate limiting and API versioning
- Structured logging and centralized error handling
- Security headers
- Redis caching and queue workers
- Verified webhooks

## Required Software


| Tool           | Purpose                 |
| -------------- | ----------------------- |
| Node.js 20 LTS | Runtime                 |
| pnpm           | Package manager         |
| Docker Desktop | Containers              |
| PostgreSQL     | Database                |
| Redis          | Cache / queue           |
| VS Code        | IDE                     |
| Git            | Version control         |
| uv             | Optional Python tooling |


### Install pnpm

```bash
npm install -g pnpm
pnpm -v
```

### Install Docker Desktop

Install from [Docker Desktop](https://www.docker.com/products/docker-desktop/), then verify:

```bash
docker -v
docker compose version
```

## Project Workspace

```text
healthcare-saas/
├── apps/
│   ├── web/                  # Next.js frontend
│   └── api/                  # NestJS backend
├── packages/
│   ├── ui/                   # Shared UI components
│   ├── types/                # Shared TS types
│   ├── eslint-config/
│   └── tsconfig/
├── infrastructure/
│   ├── docker/
│   └── nginx/
├── docs/
├── .github/
├── pnpm-workspace.yaml
├── package.json
└── turbo.json
```

### Why a Monorepo?

Production SaaS benefits heavily from a monorepo:

- Shared types, validation, and UI
- Consistent tooling
- Easier CI/CD
- Easier scaling

This project uses **Turborepo** + **pnpm workspaces** — a common stack for serious SaaS platforms.

## Getting Started

### 1. Increase pnpm network timeout

Useful on slow or unstable connections:

```bash
pnpm config set fetch-timeout 600000
pnpm config set fetch-retries 5
pnpm config set network-timeout 600000
```

### 2. Install dependencies

From the repo root:

```bash
pnpm install
```

### 3. Start infrastructure (Postgres, Redis, pgAdmin)

```bash
docker compose -f infrastructure/docker/docker-compose.yml \
  --env-file infrastructure/docker/.env up -d
```

pgAdmin is available at [http://localhost:5050](http://localhost:5050).

### 4. Configure environment variables

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
cp infrastructure/docker/.env.example infrastructure/docker/.env
```

### 5. Apply database migrations

With Postgres running:

```bash
cd apps/api
pnpm db:generate
pnpm exec prisma migrate deploy
# or for local dev with migration history: pnpm db:migrate
```

### 6. Run the apps

Web (Next.js):

```bash
cd apps/web && pnpm dev
# or from root
pnpm --filter web dev
```

API (NestJS):

```bash
cd apps/api && pnpm start:dev
# or from root
pnpm --filter api start:dev
```

## Generate a Strong Secret Key

For `JWT_SECRET` / `JWT_REFRESH_SECRET`:

```bash
openssl rand -base64 32
```

## Prisma Notes

Prisma Client must be generated before the API can compile — `@prisma/client` is a thin wrapper until `prisma generate` writes the typed client into `node_modules`.

Run once after cloning or whenever `prisma/schema.prisma` changes:

```bash
cd apps/api
pnpm db:generate
# or: npx prisma generate
```

Then restart the dev server:

```bash
pnpm start:dev
```

### What's wired up

- `postinstall` runs `prisma generate` automatically after `pnpm install`.
- `start:dev` runs `prisma generate` before `nest start --watch`.
- `.gitignore` excludes `src/generated/prisma` if you switch to a custom output path later.

After any change to `prisma/schema.prisma`, run `pnpm db:generate` — or rely on `start:dev` / `postinstall`.