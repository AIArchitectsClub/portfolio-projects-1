import { DOMAINS } from '../data/domains'

const STACKS = ['Node.js', 'Python']
const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced']

export default function FilterBar({ filters, onChange, resultCount }) {
  function set(key, value) {
    onChange({ ...filters, [key]: value })
  }

  return (
    <div className="filter-bar">
      <input
        type="search"
        placeholder="Search projects (e.g. “fraud”, “chatbot”, “forecasting”)…"
        value={filters.search}
        onChange={(e) => set('search', e.target.value)}
        className="filter-search"
      />
      <div className="filter-selects">
        <select value={filters.domain} onChange={(e) => set('domain', e.target.value)}>
          <option value="">All domains</option>
          {DOMAINS.map((d) => (
            <option key={d.name} value={d.name}>
              {d.icon} {d.name}
            </option>
          ))}
        </select>
        <select value={filters.stack} onChange={(e) => set('stack', e.target.value)}>
          <option value="">Any tech stack</option>
          {STACKS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select value={filters.difficulty} onChange={(e) => set('difficulty', e.target.value)}>
          <option value="">Any difficulty</option>
          {DIFFICULTIES.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
      <span className="filter-count">{resultCount} project{resultCount === 1 ? '' : 's'}</span>
    </div>
  )
}
