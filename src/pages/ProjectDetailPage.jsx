import { Link, useNavigate, useParams } from 'react-router-dom'
import { domainMeta } from '../data/domains'
import { useBucket } from '../context/BucketContext'
import { useProjects } from '../context/ProjectsContext'

export default function ProjectDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { projects, loading } = useProjects()
  const project = projects.find((p) => p.id === id)
  const { isInBucket, addToBucket, removeFromBucket } = useBucket()

  if (loading) {
    return (
      <div className="page">
        <p className="empty-state">Loading project…</p>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="page">
        <p className="empty-state">We couldn’t find that project.</p>
        <Link to="/" className="btn btn-primary">
          Back to catalog
        </Link>
      </div>
    )
  }

  const meta = domainMeta(project.domain)
  const inBucket = isInBucket(project.id)

  return (
    <div className="page detail-page">
      <div className="detail-hero" style={{ background: meta.color }}>
        <span className="detail-hero-icon">{meta.icon}</span>
        <div>
          <span className="detail-hero-domain">{project.domain}</span>
          <h1>{project.title}</h1>
        </div>
      </div>

      <div className="detail-body">
        <div className="detail-main">
          <section>
            <h2>Objective</h2>
            <p>{project.objective}</p>
          </section>

          <section>
            <h2>Synopsis</h2>
            <p>{project.synopsis}</p>
          </section>

          <section>
            <h2>Workflow</h2>
            <ol className="workflow-list">
              {project.workflow.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </section>

          <section>
            <h2>How this strengthens your university application</h2>
            <p className="admissions-guide">{project.admissionsGuide}</p>
          </section>
        </div>

        <aside className="detail-sidebar">
          <div className="detail-fact">
            <span className="detail-fact-label">Difficulty</span>
            <span className="badge">{project.difficulty}</span>
          </div>
          <div className="detail-fact">
            <span className="detail-fact-label">Timeline</span>
            <span>{project.timelineWeeks}</span>
          </div>
          <div className="detail-fact">
            <span className="detail-fact-label">Tech stack</span>
            <div className="tech-tags">
              {project.techStack.map((t) => (
                <span key={t} className="tech-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <button
            type="button"
            className={`btn btn-block ${inBucket ? 'btn-outline' : 'btn-primary'}`}
            onClick={() => (inBucket ? removeFromBucket(project.id) : addToBucket(project.id))}
          >
            {inBucket ? '✓ In your bucket' : '+ Add to bucket'}
          </button>
          {inBucket && (
            <button type="button" className="btn btn-block btn-accent" onClick={() => navigate('/bucket')}>
              Go to bucket
            </button>
          )}
        </aside>
      </div>
    </div>
  )
}
