import { useCallback, useMemo, useRef, useState } from 'react'
import { useProjects } from '../context/ProjectsContext'
import ProjectCard from '../components/ProjectCard'
import ProjectOverlay from '../components/ProjectOverlay'
import FilterBar from '../components/FilterBar'

const EMPTY_FILTERS = { search: '', domain: '', stack: '', difficulty: '' }
const HOVER_OPEN_DELAY = 220

export default function CatalogPage() {
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [activeId, setActiveId] = useState(null)
  const openTimer = useRef(null)

  const { projects, loading, error } = useProjects()

  // Once the overlay is open it stays open until an explicit dismiss
  // (backdrop click, the × button, or Escape) rather than closing whenever
  // the mouse wanders. The overlay is a large backdrop centered on the
  // viewport, disconnected from wherever the triggering card sits on
  // screen, so "did the mouse leave the relevant area" can't be answered
  // reliably from mouse-leave events — the backdrop mounting on top of the
  // hovered card even fires a native mouseleave on it with no real pointer
  // movement involved. Requiring an explicit dismiss sidesteps that
  // entirely, and reads better anyway for a panel meant to be read, not
  // glanced at.
  const handleHoverStart = useCallback((id) => {
    clearTimeout(openTimer.current)
    openTimer.current = setTimeout(() => setActiveId(id), HOVER_OPEN_DELAY)
  }, [])

  const handleHoverEnd = useCallback(() => {
    clearTimeout(openTimer.current)
  }, [])

  const handleOpen = useCallback((id) => {
    clearTimeout(openTimer.current)
    setActiveId(id)
  }, [])

  const handleClose = useCallback(() => {
    clearTimeout(openTimer.current)
    setActiveId(null)
  }, [])

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

  const activeProject = activeId ? projects.find((p) => p.id === activeId) : null

  return (
    <div className="page catalog-page">
      <section className="catalog-hero">
        <h1>Find your next standout GenAI project.</h1>
        <p>Hover a card for the full brief — objective, tech stack, workflow, and how it strengthens your application.</p>
      </section>

      <FilterBar filters={filters} onChange={setFilters} resultCount={filtered.length} />

      {loading && <p className="empty-state">Loading the catalog…</p>}
      {error && <p className="empty-state">Couldn’t load the catalog: {error}</p>}

      {!loading && !error && (
        <>
          {filtered.length === 0 ? (
            <p className="empty-state">No projects match those filters. Try clearing a filter or searching something else.</p>
          ) : (
            <div className="project-grid">
              {filtered.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  active={project.id === activeId}
                  onHoverStart={handleHoverStart}
                  onHoverEnd={handleHoverEnd}
                  onOpen={handleOpen}
                />
              ))}
            </div>
          )}
        </>
      )}

      {activeProject && <ProjectOverlay project={activeProject} onClose={handleClose} />}
    </div>
  )
}
