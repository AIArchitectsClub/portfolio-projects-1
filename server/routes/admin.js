import { Router } from 'express'
import { pool } from '../db.js'
import { verifyPassword } from '../lib/passwords.js'
import {
  clearAdminCookie,
  createAdminToken,
  getAdminTokenFromRequest,
  setAdminCookie,
  verifyAdminToken,
} from '../lib/adminSession.js'
import { requireAdmin } from '../middleware/requireAdmin.js'
import { attachProjects, toApplicationJson } from './applications.js'

const router = Router()

const STATUSES = ['New', 'Reviewed', 'Enrolled', 'Rejected']

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  if (!username?.trim() || !password) {
    return res.status(400).json({ error: 'Username and password are required' })
  }
  try {
    const { rows } = await pool.query('SELECT password_hash FROM admins WHERE username = $1', [username.trim()])
    if (rows.length === 0 || !verifyPassword(password, rows[0].password_hash)) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }
    setAdminCookie(res, createAdminToken())
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
})

router.post('/logout', (req, res) => {
  clearAdminCookie(res)
  res.json({ ok: true })
})

router.get('/me', (req, res) => {
  res.json({ authenticated: verifyAdminToken(getAdminTokenFromRequest(req)) })
})

router.get('/applications', requireAdmin, async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM applications ORDER BY created_at DESC')
    const withProjects = await attachProjects(rows.map(toApplicationJson))
    res.json(withProjects)
  } catch (err) {
    next(err)
  }
})

router.patch('/applications/:id', requireAdmin, async (req, res, next) => {
  const { status } = req.body
  if (!STATUSES.includes(status)) {
    return res.status(400).json({ error: `status must be one of: ${STATUSES.join(', ')}` })
  }
  try {
    const { rows } = await pool.query(
      'UPDATE applications SET status = $1 WHERE id = $2 RETURNING *',
      [status, req.params.id],
    )
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' })
    const [withProjects] = await attachProjects([toApplicationJson(rows[0])])
    res.json(withProjects)
  } catch (err) {
    next(err)
  }
})

router.delete('/applications/:id', requireAdmin, async (req, res, next) => {
  try {
    const { rows } = await pool.query('DELETE FROM applications WHERE id = $1 RETURNING id', [req.params.id])
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

export default router
