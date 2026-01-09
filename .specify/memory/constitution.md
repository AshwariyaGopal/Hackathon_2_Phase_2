<!-- Sync Impact Report:
Version change: None (Current: 1.1.0)
Modified principles: None
Added sections: None
Removed sections: None
Templates requiring updates:
  - .specify/templates/plan-template.md: ✅ verified
  - .specify/templates/spec-template.md: ✅ verified
  - .specify/templates/tasks-template.md: ✅ verified
  - .claude/commands/*.md: ✅ verified
Follow-up TODOs: RATIFICATION_DATE
-->
# Hackathon 2 - Phase II & Beyond: The Evolution of Todo – Full-Stack Multi-User Web Application with AI-Enhanced Development

## Core Principles

### Strict spec-driven development
Every feature, component, endpoint, schema change, UI element, subagent, and skill must be defined in a complete, approved specification under /specs/ before any implementation begins

### Multi-user security and data isolation
All operations must enforce user ownership via JWT authentication; no user can ever access, view, or modify another user’s tasks

### Full-stack coherence in a monorepo
Frontend (Next.js) and backend (FastAPI) evolve together from the same specifications using Claude Code as the primary implementation coordinator

### AI-augmented workflow
Leverage Claude Code subagents (Frontend Engineer, Backend Engineer, Security Reviewer, Fullstack Coordinator, Task Intelligence Agent) and skills (Next.js Frontend Expert, FastAPI Expert, etc.) throughout development to ensure consistency, quality, and intelligence

### Progressive evolution
Build directly on Phase I console app logic, migrating to persistent storage, web UI, authentication, and eventually intelligent features without unnecessary rewrites

## Key standards

### Phase II core features
Implement exactly the 5 basic CRUD operations (Add, Delete, Update, View, Mark Complete) with full user authentication and persistence

### Authentication
Better Auth (frontend) with JWT plugin enabled; FastAPI backend verifies JWT using shared BETTER_AUTH_SECRET environment variable; all API routes require valid token and enforce user_id scoping

### API
RESTful endpoints under /api/tasks (no user_id in URL – scoping via JWT); support filtering/sorting query params; return JSON with proper Pydantic models

### Database
Neon Serverless PostgreSQL via SQLModel; schema with users table (managed by Better Auth) and tasks table (user_id foreign key, title, description, completed, timestamps)

### Frontend
Next.js 16+ (App Router), TypeScript, Tailwind CSS; server components by default; centralized API client (/frontend/lib/api.ts) with automatic JWT attachment

### Monorepo structure
Strictly follow documented layout – /.spec-kit/config.yaml, organized /specs/ (overview, features/, api/, database/, ui/), layered CLAUDE.md (root, /frontend, /backend), .claude/agents/ and .claude/skills/

### AI agents & skills
– Subagents in .claude/agents/ for specialized roles (e.g., Frontend Engineer, Backend Engineer)
– Skills in .claude/skills/ for reusable expertise (e.g., Next.js Frontend Expert)
– All agents must enforce spec-first workflow and separation of concerns

### Code quality
TypeScript strict types, Python PEP 8, meaningful error handling (HTTPException), responsive mobile-first UI, no inline styles

## Constraints

### Technology stack
Next.js 16+ (App Router), FastAPI, SQLModel, Neon PostgreSQL, Better Auth (JWT), Claude Code + Spec-Kit Plus; no additional major libraries unless explicitly specced

### Storage
Fully persistent via Neon; no in-memory fallback

### Scope for Phase II
Focus on basic authenticated CRUD + secure multi-user isolation; intermediate/advanced features (priorities, tags, due dates, recurring, search/filter/sort) may be added only via separate approved specs

### Development workflow
Write/update spec in /specs/
Commit and approve spec
Delegate to appropriate subagent using Claude Code (@specs/... references)
Test locally via docker-compose
Iterate on spec if needed

### Environment
Docker Compose for local development; shared secrets via .env (DATABASE_URL, BETTER_AUTH_SECRET)

## Success criteria

### Fully functional multi-user web application
Users can independently sign up, log in, and manage isolated persistent task lists

### Rock-solid security
JWT required on all API calls, user isolation enforced at database and route level, unauthorized requests return 401

### Clean, responsive frontend
Mobile-friendly task list, create/edit forms, authentication pages, real-time feedback using Next.js + Tailwind

### AI-enhanced development process
Subagents and skills actively used and visible in commit history; development is faster, consistent, and higher quality

### Complete specification coverage
/specs/ contains organized, up-to-date files for overview, features (task-crud.md, authentication.md), api (rest-endpoints.md), database (schema.md), ui (components.md, pages.md)

### Monorepo excellence
GitHub repository with .spec-kit/config.yaml defining phase2-web, layered CLAUDE.md guidance, .claude/agents/ and .claude/skills/ populated, docker-compose.yml, and comprehensive README with setup, run, and demo instructions

### Ready for future phases
Architecture supports seamless addition of intelligent features (Phase III chatbot, subagents for task suggestions, recurring tasks, etc.)

## Governance
Constitution supersedes all other practices; Amendments require documentation, approval, migration plan.
All PRs/reviews must verify compliance; Complexity must be justified; Use CLAUDE.md for runtime development guidance.

**Version**: 1.1.0 | **Ratified**: TODO(RATIFICATION_DATE): Not specified by user | **Last Amended**: 2026-01-06