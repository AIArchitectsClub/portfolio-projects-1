# ProjectBucket

A catalog of 50 industry-style GenAI / Agentic AI portfolio projects across
10 domains (Finance, eCommerce, Legal, Transportation, Public Service,
Marketing, Healthcare, Education, Climate & Sustainability, Media &
Entertainment) for pre-university students building their college
application portfolio. Students browse the catalog, open a project to see
its objective, synopsis, timeline, tech stack, workflow, and admissions
guide, add projects to a bucket, and submit an application form to get
started.

## Stack

React + Vite frontend, Express + Neon Postgres backend, served as a single
deployable artifact (one process, one port).

## Local setup

1. Create a Neon Postgres project and copy its connection string.
2. `cp .env.example .env` and fill in `DATABASE_URL`.
3. `npm install`
4. `npm run db:setup` — creates tables and seeds the 50 projects.
5. `npm run dev` — starts the Vite dev server and the Express API together.

## Production

```bash
npm install --include=dev
npm run build
npm start
```

Serves the built frontend and the API from a single Express process.
