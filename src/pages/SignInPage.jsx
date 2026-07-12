import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { signIn } from '../lib/authClient'

export default function SignInPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const { error: signInError } = await signIn.email({ email, password })
    setSubmitting(false)
    if (signInError) {
      setError(signInError.message || 'Could not sign in.')
      return
    }
    navigate(location.state?.from || '/bucket')
  }

  return (
    <div className="page">
      <h1>Sign in</h1>
      <p className="page-subtitle">Sign in to submit an application and track its status.</p>
      <form className="application-form" style={{ maxWidth: 400 }} onSubmit={handleSubmit} noValidate>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <span className="field-error">{error}</span>}
        <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <p className="page-subtitle" style={{ marginTop: 16 }}>
        Don’t have an account? <Link to="/sign-up">Sign up</Link>
      </p>
    </div>
  )
}
