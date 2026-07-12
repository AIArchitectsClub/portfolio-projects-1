async function request(path, options) {
  const res = await fetch(`/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Request failed with status ${res.status}`)
  }
  return res.status === 204 ? null : res.json()
}

export function fetchProjects() {
  return request('/projects')
}

export function fetchProject(id) {
  return request(`/projects/${id}`)
}

export function fetchApplications() {
  return request('/applications/mine')
}

export function submitApplication(payload) {
  return request('/applications', { method: 'POST', body: JSON.stringify(payload) })
}
