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
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS application_projects (
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  PRIMARY KEY (application_id, project_id)
);
