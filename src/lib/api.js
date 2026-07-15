async function request(path, options) {
  const res = await fetch(`/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    const error = new Error(body.error || `Request failed with status ${res.status}`)
    error.status = res.status
    throw error
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

export function adminLogin(username, password) {
  return request('/admin/login', { method: 'POST', body: JSON.stringify({ username, password }) })
}

export function adminLogout() {
  return request('/admin/logout', { method: 'POST' })
}

export function fetchAdminApplications() {
  return request('/admin/applications')
}

export function updateApplicationStatus(id, status) {
  return request(`/admin/applications/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) })
}

export function deleteApplication(id) {
  return request(`/admin/applications/${id}`, { method: 'DELETE' })
}
