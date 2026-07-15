import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { pool } from '../db.js'
import { hashPassword } from '../lib/passwords.js'
import { mockProjects } from '../../src/data/projects.js'

const ADMIN_USERNAME = 'aacadmin'
const ADMIN_PASSWORD = 'aacadmin'

async function ensureAdminSeeded() {
  const { rows } = await pool.query('SELECT id FROM admins WHERE username = $1', [ADMIN_USERNAME])
  if (rows.length > 0) return
  await pool.query('INSERT INTO admins (username, password_hash) VALUES ($1, $2)', [
    ADMIN_USERNAME,
    hashPassword(ADMIN_PASSWORD),
  ])
  console.log(`Seeded admin account (${ADMIN_USERNAME}).`)
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const authSchema = readFileSync(path.join(__dirname, 'auth-schema.sql'), 'utf8')
const schema = readFileSync(path.join(__dirname, 'schema.sql'), 'utf8')

async function main() {
  await pool.query(authSchema)
  await pool.query(schema)

  for (const p of mockProjects) {
    await pool.query(
      `INSERT INTO projects
         (id, title, domain, kind, difficulty, timeline_weeks, stack, tech_stack, objective, synopsis, workflow, admissions_guide)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       ON CONFLICT (id) DO NOTHING`,
      [
        p.id, p.title, p.domain, p.kind, p.difficulty, p.timelineWeeks, p.stack,
        p.techStack, p.objective, p.synopsis, p.workflow, p.admissionsGuide,
      ],
    )
  }

  await ensureAdminSeeded()

  console.log(`Schema created and ${mockProjects.length} projects seeded.`)
  await pool.end()
}

main().catch((err) => {
  console.error('Failed to set up database:', err)
  process.exit(1)
})
