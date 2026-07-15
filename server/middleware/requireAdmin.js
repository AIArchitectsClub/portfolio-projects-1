import { getAdminTokenFromRequest, verifyAdminToken } from '../lib/adminSession.js'

export function requireAdmin(req, res, next) {
  const token = getAdminTokenFromRequest(req)
  if (!verifyAdminToken(token)) return res.status(401).json({ error: 'Admin sign-in required' })
  next()
}
