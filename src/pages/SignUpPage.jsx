import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signUp } from '../lib/authClient'

export default function SignUpPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const { error: signUpError } = await signUp.email({ name, email, password })
    setSubmitting(false)
    if (signUpError) {
      setError(signUpError.message || 'Could not create an account.')
      return
    }
    navigate('/bucket')
  }

  return (
    <div className="page">
      <h1>Create an account</h1>
      <p className="page-subtitle">Create an account to submit an application and track its status.</p>
      <form className="application-form" style={{ maxWidth: 400 }} onSubmit={handleSubmit} noValidate>
        <label>
          Full name
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jordan Lee" />
        </label>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} />
        </label>
        {error && <span className="field-error">{error}</span>}
        <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
          {submitting ? 'Creating account…' : 'Sign up'}
        </button>
      </form>
      <p className="page-subtitle" style={{ marginTop: 16 }}>
        Already have an account? <Link to="/sign-in">Sign in</Link>
      </p>
    </div>
  )
}
