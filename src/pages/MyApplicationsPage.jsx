import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { fetchApplications } from '../lib/api'

export default function MyApplicationsPage() {
  const location = useLocation()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchApplications()
      .then(setApplications)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="page">
      <h1>My applications</h1>

      {location.state?.justSubmitted && (
        <div className="success-banner">
          🎉 Application submitted! Our team will reach out to your email with next steps shortly.
        </div>
      )}

      {loading && <p className="empty-state">Loading your applications…</p>}
      {error && <p className="empty-state">Couldn’t load applications: {error}</p>}

      {!loading && !error && applications.length === 0 && (
        <>
          <p className="empty-state">You haven’t submitted an application yet.</p>
          <Link to="/" className="btn btn-primary">
            Browse the catalog
          </Link>
        </>
      )}

      {!loading && !error && applications.length > 0 && (
        <div className="application-list">
          {applications.map((app) => (
            <div key={app.id} className="application-card">
              <div className="application-card-header">
                <span>Submitted {new Date(app.submittedAt).toLocaleString()}</span>
                <span className="badge">
                  {app.projects.length} project{app.projects.length === 1 ? '' : 's'}
                </span>
              </div>
              <p className="application-card-name">
                {app.name} · {app.email}
              </p>
              <ul className="summary-list">
                {app.projects.map((p) => (
                  <li key={p.id}>
                    <Link to={`/projects/${p.id}`}>{p.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
