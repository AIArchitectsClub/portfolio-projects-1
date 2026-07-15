import { NavLink, useNavigate } from 'react-router-dom'
import { useBucket } from '../context/BucketContext'
import { signOut, useSession } from '../lib/authClient'

export default function NavBar() {
  const { bucket } = useBucket()
  const { data: session } = useSession()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <header className="navbar">
      <NavLink to="/" className="navbar-brand">
        <span className="navbar-logo">🚀</span>
        ProjectBucket
      </NavLink>
      <nav className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Catalog
        </NavLink>
        <NavLink to="/my-applications" className={({ isActive }) => (isActive ? 'active' : '')}>
          My Applications
        </NavLink>
        <NavLink to="/bucket" className={({ isActive }) => `bucket-link ${isActive ? 'active' : ''}`}>
          🧺 Bucket
          {bucket.length > 0 && <span className="bucket-badge">{bucket.length}</span>}
        </NavLink>
        {session ? (
          <>
            <span className="navbar-user">Hi, {session.user.name.split(' ')[0]}</span>
            <button type="button" className="btn btn-sm btn-outline" onClick={handleSignOut}>
              Sign out
            </button>
          </>
        ) : (
          <>
            <NavLink to="/sign-in" className={({ isActive }) => (isActive ? 'active' : '')}>
              Sign in
            </NavLink>
            <NavLink to="/sign-up" className="btn btn-sm btn-primary">
              Sign up
            </NavLink>
          </>
        )}
        <NavLink to="/admin" className="navbar-admin-link">
          Admin
        </NavLink>
      </nav>
    </header>
  )
}
