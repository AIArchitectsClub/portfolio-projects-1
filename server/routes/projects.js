import { Router } from 'express'
import { pool } from '../db.js'

const router = Router()

function toProjectJson(row) {
  return {
    id: row.id,
    title: row.title,
    domain: row.domain,
    kind: row.kind,
    difficulty: row.difficulty,
    timelineWeeks: row.timeline_weeks,
    stack: row.stack,
    techStack: row.tech_stack,
    objective: row.objective,
    synopsis: row.synopsis,
    workflow: row.workflow,
    admissionsGuide: row.admissions_guide,
  }
}

router.get('/', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM projects ORDER BY domain, title')
    res.json(rows.map(toProjectJson))
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM projects WHERE id = $1', [req.params.id])
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' })
    res.json(toProjectJson(rows[0]))
  } catch (err) {
    next(err)
  }
})

export default router
