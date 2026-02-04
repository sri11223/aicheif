# Setup Instructions

## Prerequisites
- Node.js 20+
- PostgreSQL 15+
- Redis 7+

## Backend
```bash
cd backend
npm install
npm run dev
```

## Frontend
```bash
cd frontend
npm install
npm run dev
```

## Database
- Apply schema: `backend/sql/schema.sql`
- Configure `DATABASE_URL` and `REDIS_URL` in `.env`

## Environment Variables
```
PORT=4000
CORS_ORIGIN=http://localhost:3000
DATABASE_URL=postgres://user:pass@localhost:5432/aicheif
REDIS_URL=redis://localhost:6379
```
