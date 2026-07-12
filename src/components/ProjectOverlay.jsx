import { useEffect } from 'react'
import { domainMeta } from '../data/domains'
import { useBucket } from '../context/BucketContext'

export default function ProjectOverlay({ project, onClose }) {
  const meta = domainMeta(project.domain)
  const { isInBucket, addToBucket, removeFromBucket } = useBucket()
  const inBucket = isInBucket(project.id)

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div className="overlay-panel" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="overlay-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="overlay-header" style={{ background: `linear-gradient(135deg, ${meta.color}, ${meta.color}bb)` }}>
          <span className="overlay-icon">{meta.icon}</span>
          <div>
            <span className="overlay-domain">{project.domain}</span>
            <h2>{project.title}</h2>
          </div>
        </div>

        <div className="overlay-badges">
          <span className="badge">{project.difficulty}</span>
          <span className="badge badge-muted">⏱ {project.timelineWeeks}</span>
          <span className="badge badge-muted">{project.stack}</span>
        </div>

        <div className="overlay-body">
          <section>
            <h3>Objective</h3>
            <p>{project.objective}</p>
          </section>

          <section>
            <h3>Synopsis</h3>
            <p>{project.synopsis}</p>
          </section>

          <section>
            <h3>Tech stack</h3>
            <div className="tech-tags">
              {project.techStack.map((t) => (
                <span key={t} className="tech-tag">
                  {t}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h3>Workflow</h3>
            <ol className="workflow-list">
              {project.workflow.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </section>

          <section>
            <h3>How this strengthens your application</h3>
            <p className="admissions-guide">{project.admissionsGuide}</p>
          </section>
        </div>

        <button
          type="button"
          className={`btn btn-block ${inBucket ? 'btn-outline' : 'btn-primary'}`}
          onClick={() => (inBucket ? removeFromBucket(project.id) : addToBucket(project.id))}
        >
          {inBucket ? '✓ In your bucket' : '+ Add to bucket'}
        </button>
      </div>
    </div>
  )
}
