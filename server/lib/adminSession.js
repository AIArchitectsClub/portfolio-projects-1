import { createHmac, timingSafeEqual } from 'node:crypto'
import 'dotenv/config'

const SESSION_TTL_MS = 12 * 60 * 60 * 1000 // 12 hours
const COOKIE_NAME = 'admin_session'

function sign(payload) {
  return createHmac('sha256', process.env.BETTER_AUTH_SECRET).update(payload).digest('hex')
}

export function createAdminToken() {
  const payload = JSON.stringify({ exp: Date.now() + SESSION_TTL_MS })
  const encoded = Buffer.from(payload).toString('base64url')
  return `${encoded}.${sign(encoded)}`
}

export function verifyAdminToken(token) {
  if (!token) return false
  const [encoded, signature] = token.split('.')
  if (!encoded || !signature) return false

  const expected = sign(encoded)
  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false

  try {
    const { exp } = JSON.parse(Buffer.from(encoded, 'base64url').toString())
    return typeof exp === 'number' && exp > Date.now()
  } catch {
    return false
  }
}

export function setAdminCookie(res, token) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_TTL_MS,
    path: '/',
  })
}

export function clearAdminCookie(res) {
  res.clearCookie(COOKIE_NAME, { path: '/' })
}

// No cookie-parser middleware is installed (Better Auth parses its own
// cookies internally via the Fetch API Request object, not through
// Express), so read the raw Cookie header directly here instead of adding
// a dependency just for this one cookie.
export function getAdminTokenFromRequest(req) {
  const raw = req.headers.cookie || ''
  const match = raw
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE_NAME}=`))
  return match ? decodeURIComponent(match.slice(COOKIE_NAME.length + 1)) : undefined
}
