import { domainMeta } from '../data/domains'
import { useBucket } from '../context/BucketContext'

export default function ProjectCard({ project, active, onHoverStart, onHoverEnd, onOpen }) {
  const meta = domainMeta(project.domain)
  const { isInBucket, addToBucket, removeFromBucket } = useBucket()
  const inBucket = isInBucket(project.id)

  function handleBucketClick(e) {
    e.stopPropagation()
    if (inBucket) removeFromBucket(project.id)
    else addToBucket(project.id)
  }

  return (
    <article
      className={`project-card ${active ? 'is-active' : ''}`}
      onMouseEnter={() => onHoverStart(project.id)}
      onMouseLeave={onHoverEnd}
      onClick={() => onOpen(project.id)}
      onFocus={() => onHoverStart(project.id)}
      onBlur={onHoverEnd}
      tabIndex={0}
    >
      <div
        className="project-card-thumb"
        style={{ background: `linear-gradient(140deg, ${meta.color}, ${meta.color}99)` }}
      >
        <span className="project-card-icon">{meta.icon}</span>
        <span className={`difficulty-dot difficulty-${project.difficulty.toLowerCase()}`} title={project.difficulty} />
        <button
          type="button"
          className={`bucket-toggle ${inBucket ? 'in-bucket' : ''}`}
          onClick={handleBucketClick}
          aria-label={inBucket ? 'Remove from bucket' : 'Add to bucket'}
        >
          {inBucket ? '✓' : '+'}
        </button>
      </div>
      <div className="project-card-body">
        <span className="project-card-title">{project.title.replace(/\s*—.*$/, '')}</span>
        <div className="project-card-meta">
          <span className="project-card-domain-tag" style={{ color: meta.color }}>
            {project.domain}
          </span>
          <span className="stack-tag">{project.stack}</span>
        </div>
      </div>
    </article>
  )
}
