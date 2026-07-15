CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  domain TEXT NOT NULL,
  kind TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  timeline_weeks TEXT NOT NULL,
  stack TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL,
  objective TEXT NOT NULL,
  synopsis TEXT NOT NULL,
  workflow TEXT[] NOT NULL,
  admissions_guide TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  school TEXT NOT NULL,
  grade TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'New',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Idempotent retrofit for the column above, since CREATE TABLE IF NOT EXISTS
-- is a no-op against an already-existing applications table.
ALTER TABLE applications ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'New';

CREATE TABLE IF NOT EXISTS application_projects (
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  PRIMARY KEY (application_id, project_id)
);

-- Deliberately separate from Better Auth's "user" table: the admin login
-- is a single fixed operator credential (a plain username, not an email),
-- and Better Auth's email/password provider hard-requires a valid email
-- format even at sign-in time, so it can't represent this account.
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
