import { useMemo, useState } from 'react'
import { useProjects } from '../context/ProjectsContext'
import ProjectCard from '../components/ProjectCard'
import FilterBar from '../components/FilterBar'

const EMPTY_FILTERS = { search: '', domain: '', stack: '', difficulty: '' }

export default function CatalogPage() {
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const { projects, loading, error } = useProjects()

  const filtered = useMemo(() => {
    const q = filters.search.trim().toLowerCase()
    return projects.filter((p) => {
      if (filters.domain && p.domain !== filters.domain) return false
      if (filters.stack && p.stack !== filters.stack) return false
      if (filters.difficulty && p.difficulty !== filters.difficulty) return false
      if (q) {
        const haystack = `${p.title} ${p.objective} ${p.synopsis} ${p.domain}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [filters, projects])

  return (
    <div className="page catalog-page">
      <section className="catalog-hero">
        <h1>Build a GenAI project that gets your application noticed.</h1>
        <p>
          Browse {projects.length || 50}+ industry-style GenAI and Agentic AI projects across Finance, Healthcare,
          Legal, Public Service, and more — each with a full guide on scope, tech stack, and how it strengthens
          your university application. Pick a few, add them to your bucket, and submit your details to get started.
        </p>
      </section>

      {loading && <p className="empty-state">Loading the catalog…</p>}
      {error && <p className="empty-state">Couldn’t load the catalog: {error}</p>}

      {!loading && !error && (
        <>
          <FilterBar filters={filters} onChange={setFilters} resultCount={filtered.length} />

          {filtered.length === 0 ? (
            <p className="empty-state">No projects match those filters. Try clearing a filter or searching something else.</p>
          ) : (
            <div className="project-grid">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
