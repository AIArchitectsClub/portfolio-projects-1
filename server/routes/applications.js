import { Router } from 'express'
import { pool } from '../db.js'
import { requireAuth } from '../middleware/requireAuth.js'

const router = Router()

async function attachProjects(applications) {
  if (applications.length === 0) return []
  const ids = applications.map((a) => a.id)
  const { rows } = await pool.query(
    `SELECT ap.application_id, p.id, p.title, p.domain
     FROM application_projects ap
     JOIN projects p ON p.id = ap.project_id
     WHERE ap.application_id = ANY($1)`,
    [ids],
  )
  const byApplication = new Map()
  for (const row of rows) {
    const list = byApplication.get(row.application_id) ?? []
    list.push({ id: row.id, title: row.title, domain: row.domain })
    byApplication.set(row.application_id, list)
  }
  return applications.map((a) => ({ ...a, projects: byApplication.get(a.id) ?? [] }))
}

function toApplicationJson(row) {
  return {
    id: row.id,
    name: row.student_name,
    email: row.email,
    phone: row.phone,
    school: row.school,
    grade: row.grade,
    submittedAt: row.created_at,
  }
}

router.get('/mine', requireAuth, async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM applications WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id],
    )
    const withProjects = await attachProjects(rows.map(toApplicationJson))
    res.json(withProjects)
  } catch (err) {
    next(err)
  }
})

router.post('/', requireAuth, async (req, res, next) => {
  const { projectIds, name, email, phone, school, grade } = req.body
  if (!Array.isArray(projectIds) || projectIds.length === 0) {
    return res.status(400).json({ error: 'At least one project is required' })
  }
  if (!name?.trim() || !email?.trim() || !phone?.trim() || !school?.trim() || !grade?.trim()) {
    return res.status(400).json({ error: 'name, email, phone, school and grade are required' })
  }

  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const { rows } = await client.query(
      `INSERT INTO applications (user_id, student_name, email, phone, school, grade)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [req.user.id, name.trim(), email.trim(), phone.trim(), school.trim(), grade.trim()],
    )
    const application = rows[0]
    for (const projectId of projectIds) {
      await client.query(
        'INSERT INTO application_projects (application_id, project_id) VALUES ($1, $2)',
        [application.id, projectId],
      )
    }
    await client.query('COMMIT')
    const [withProjects] = await attachProjects([toApplicationJson(application)])
    res.status(201).json(withProjects)
  } catch (err) {
    await client.query('ROLLBACK')
    next(err)
  } finally {
    client.release()
  }
})

export default router
