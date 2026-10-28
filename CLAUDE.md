# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Install dependencies**: `bun install`
- **Run development server**: `bun dev`
- **Build project**: `bun run build`
- **Lint code**: `bun run lint`
- **Database Management (Prisma 7)**:
  - Generate client: `npx prisma generate`
  - Push schema to DB: `npx prisma db push`
  - Create migration: `npx prisma migrate dev --name <migration_name>`
  - Open Studio: `npx prisma studio`

## Architecture Overview

### Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Runtime**: Bun
- **Language**: TypeScript
- **Database/ORM**: PostgreSQL with Prisma 7
- **Authentication**: Better Auth
- **Styling**: Tailwind CSS 4, shadcn/ui, Base UI
- **Forms**: React Hook Form + Zod v4

### Project Structure

- `app/`: Next.js App Router pages and API routes.
  - `(shop)/`: Route group for the main storefront.
  - `api/auth/[...all]`: Better Auth endpoint handler.
  - `generated/prisma/`: Custom output directory for the Prisma Client.
- `components/`: UI components (mostly shadcn/ui in `components/ui`).
- `lib/`: Shared utilities and singleton instances.
  - `prisma.ts`: Prisma Client initialization.
  - `auth.ts` & `auth-client.ts`: Better Auth server and client configurations.
- `prisma/`: Database schema and migration files.
- `services/`, `queries/`, `schemas/`: Logic layers for database interaction and validation (pattern: separation of data access from UI).

### Key Conventions

- **Prisma Client Location**: The Prisma client is generated into `app/generated/prisma` instead of the default `node_modules`. Always import from this path or ensure the client is correctly linked.
- **Authentication**: Better Auth is used for user management and sessions. Refer to `lib/auth.ts` for server-side logic and `lib/auth-client.ts` for client-side hooks.
- **Data Flow**: Prefer using the `services/` and `queries/` directories to encapsulate database logic rather than calling Prisma directly within Server Components.
