import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminLogout, fetchAdminApplications, updateApplicationStatus } from '../lib/api'

const STATUSES = ['New', 'Reviewed', 'Enrolled', 'Rejected']

export default function AdminPage() {
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updatingId, setUpdatingId] = useState(null)
  const [statusFilter, setStatusFilter] = useState('')

  const load = useCallback(() => {
    setLoading(true)
    setError(null)
    fetchAdminApplications()
      .then(setApplications)
      .catch((err) => {
        if (err.status === 401) navigate('/admin/login')
        else setError(err.message)
      })
      .finally(() => setLoading(false))
  }, [navigate])

  useEffect(() => {
    load()
  }, [load])

  const counts = useMemo(() => {
    const base = { New: 0, Reviewed: 0, Enrolled: 0, Rejected: 0 }
    for (const a of applications) base[a.status] = (base[a.status] ?? 0) + 1
    return base
  }, [applications])

  const filtered = statusFilter ? applications.filter((a) => a.status === statusFilter) : applications

  async function handleStatusChange(id, status) {
    setUpdatingId(id)
    setError(null)
    try {
      const updated = await updateApplicationStatus(id, status)
      setApplications((prev) => prev.map((a) => (a.id === id ? updated : a)))
    } catch (err) {
      setError(err.message)
    } finally {
      setUpdatingId(null)
    }
  }

  async function handleLogout() {
    await adminLogout()
    navigate('/admin/login')
  }

  return (
    <div className="page admin-page">
      <div className="admin-header">
        <div>
          <span className="admin-login-badge">Admin</span>
          <h1>Submissions</h1>
        </div>
        <button type="button" className="btn btn-outline btn-sm" onClick={handleLogout}>
          Sign out
        </button>
      </div>

      <div className="admin-stats">
        {STATUSES.map((s) => (
          <button
            key={s}
            type="button"
            className={`admin-stat admin-stat-${s.toLowerCase()} ${statusFilter === s ? 'is-active' : ''}`}
            onClick={() => setStatusFilter(statusFilter === s ? '' : s)}
          >
            <span className="admin-stat-count">{counts[s]}</span>
            <span className="admin-stat-label">{s}</span>
          </button>
        ))}
        {statusFilter && (
          <button type="button" className="btn btn-sm btn-outline" onClick={() => setStatusFilter('')}>
            Clear filter
          </button>
        )}
      </div>

      {loading && <p className="empty-state">Loading submissions…</p>}
      {error && <p className="empty-state">{error}</p>}

      {!loading && !error && filtered.length === 0 && (
        <p className="empty-state">
          {statusFilter ? `No submissions with status "${statusFilter}".` : 'No submissions yet.'}
        </p>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Contact</th>
                <th>School / Grade</th>
                <th>Projects</th>
                <th>Submitted</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app.id}>
                  <td className="admin-table-name">{app.name}</td>
                  <td>
                    <div>{app.email}</div>
                    <div className="admin-table-muted">{app.phone}</div>
                  </td>
                  <td>
                    <div>{app.school}</div>
                    <div className="admin-table-muted">{app.grade}</div>
                  </td>
                  <td>
                    <div className="admin-project-chips">
                      {app.projects.map((p) => (
                        <span key={p.id} className="tech-tag">
                          {p.title.replace(/\s*—.*$/, '')}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="admin-table-muted">{new Date(app.submittedAt).toLocaleDateString()}</td>
                  <td>
                    <select
                      className={`admin-status-select admin-status-${app.status.toLowerCase()}`}
                      value={app.status}
                      disabled={updatingId === app.id}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
