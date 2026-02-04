# Architecture Overview

## System Goals
- Provide a unified dashboard where agents coordinate schedule, finance, learning, health, and communications.
- Maintain a negotiation layer that balances conflicts and updates plans dynamically.

## High-level Components
- **Frontend (Next.js)**: domain sections, system status, and negotiation summary cards.
- **Backend (Node.js + Express)**: agent registry, negotiation engine, validation layer.
- **PostgreSQL**: persistence for agent recommendations, negotiation runs, user profiles.
- **Redis**: near-real-time state sync and queue coordination.

## Domain Separation
- **Domain models** live under `backend/src/domain` and define cross-agent contracts.
- **Agent registry** lives under `backend/src/agents` and exposes metadata.
- **Negotiation engine** lives under `backend/src/negotiation` and resolves conflicts.
- **Routes** under `backend/src/routes` handle validation and request lifecycle.

## Reliability & Observability
- Input validation via Zod at each API boundary.
- Standardized JSON error payloads.
- Logging ready for morgan/pino integration.

## Security
- Helmet for secure headers.
- CORS configured via environment variables.
- Planned JWT/OAuth integration in auth service (to be added).
