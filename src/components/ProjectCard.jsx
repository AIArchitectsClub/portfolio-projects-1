import { Link } from 'react-router-dom'
import { domainMeta } from '../data/domains'
import { useBucket } from '../context/BucketContext'

export default function ProjectCard({ project }) {
  const meta = domainMeta(project.domain)
  const { isInBucket, addToBucket, removeFromBucket } = useBucket()
  const inBucket = isInBucket(project.id)

  return (
    <article className="project-card">
      <Link to={`/projects/${project.id}`} className="project-card-thumb" style={{ background: meta.color }}>
        <span className="project-card-icon">{meta.icon}</span>
        <span className="project-card-difficulty">{project.difficulty}</span>
      </Link>
      <div className="project-card-body">
        <span className="project-card-domain" style={{ color: meta.color }}>
          {meta.icon} {project.domain}
        </span>
        <Link to={`/projects/${project.id}`} className="project-card-title">
          {project.title}
        </Link>
        <p className="project-card-objective">{project.objective}</p>
        <div className="project-card-meta">
          <span>⏱ {project.timelineWeeks}</span>
          <span>{project.stack}</span>
        </div>
        <button
          type="button"
          className={`btn btn-sm ${inBucket ? 'btn-outline' : 'btn-primary'}`}
          onClick={() => (inBucket ? removeFromBucket(project.id) : addToBucket(project.id))}
        >
          {inBucket ? '✓ In bucket' : '+ Add to bucket'}
        </button>
      </div>
    </article>
  )
}
