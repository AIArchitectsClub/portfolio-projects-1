import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { pool } from '../db.js'
import { mockProjects } from '../../src/data/projects.js'

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

  console.log(`Schema created and ${mockProjects.length} projects seeded.`)
  await pool.end()
}

main().catch((err) => {
  console.error('Failed to set up database:', err)
  process.exit(1)
})
