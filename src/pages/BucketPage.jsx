import { Link, useNavigate } from 'react-router-dom'
import { domainMeta } from '../data/domains'
import { useBucket } from '../context/BucketContext'
import { useProjects } from '../context/ProjectsContext'

export default function BucketPage() {
  const { bucket, removeFromBucket, clearBucket } = useBucket()
  const { projects: allProjects } = useProjects()
  const navigate = useNavigate()
  const projects = bucket.map((id) => allProjects.find((p) => p.id === id)).filter(Boolean)

  if (projects.length === 0) {
    return (
      <div className="page">
        <h1>Your bucket is empty</h1>
        <p className="empty-state">Browse the catalog and add a few projects you’d like to build.</p>
        <Link to="/" className="btn btn-primary">
          Browse the catalog
        </Link>
      </div>
    )
  }

  return (
    <div className="page">
      <h1>Your bucket</h1>
      <p className="page-subtitle">
        Review your selected projects, then submit your details and our team will follow up with next steps.
      </p>

      <ul className="bucket-list">
        {projects.map((project) => {
          const meta = domainMeta(project.domain)
          return (
            <li key={project.id} className="bucket-item">
              <span className="bucket-item-icon" style={{ background: meta.color }}>
                {meta.icon}
              </span>
              <div className="bucket-item-body">
                <Link to={`/projects/${project.id}`}>{project.title}</Link>
                <span className="bucket-item-meta">
                  {project.domain} · {project.stack} · {project.timelineWeeks}
                </span>
              </div>
              <button type="button" className="btn btn-sm btn-outline" onClick={() => removeFromBucket(project.id)}>
                Remove
              </button>
            </li>
          )
        })}
      </ul>

      <div className="bucket-actions">
        <button type="button" className="btn btn-outline" onClick={clearBucket}>
          Clear bucket
        </button>
        <button type="button" className="btn btn-primary" onClick={() => navigate('/apply')}>
          Continue to application →
        </button>
      </div>
    </div>
  )
}
