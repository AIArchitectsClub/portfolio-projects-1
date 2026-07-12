import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useBucket } from '../context/BucketContext'
import { useProjects } from '../context/ProjectsContext'
import { loadStudentInfo, saveStudentInfo } from '../lib/storage'
import { submitApplication } from '../lib/api'

const GRADES = ['9th grade', '10th grade', '11th grade', '12th grade', 'Gap year']

export default function ApplicationPage() {
  const { bucket, clearBucket } = useBucket()
  const { projects: allProjects } = useProjects()
  const navigate = useNavigate()
  const projects = bucket.map((id) => allProjects.find((p) => p.id === id)).filter(Boolean)
  const [form, setForm] = useState(() => loadStudentInfo() ?? { name: '', email: '', phone: '', school: '', grade: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  if (projects.length === 0) {
    return (
      <div className="page">
        <h1>Nothing to submit yet</h1>
        <p className="empty-state">Add at least one project to your bucket before submitting an application.</p>
        <Link to="/" className="btn btn-primary">
          Browse the catalog
        </Link>
      </div>
    )
  }

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Please enter a valid email.'
    if (!form.phone.trim()) next.phone = 'Please enter a phone number.'
    if (!form.school.trim()) next.school = 'Please enter your current school.'
    if (!form.grade) next.grade = 'Please select your grade.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    setSubmitError(null)
    try {
      saveStudentInfo(form)
      await submitApplication({ projectIds: projects.map((p) => p.id), ...form })
      clearBucket()
      navigate('/my-applications', { state: { justSubmitted: true } })
    } catch (err) {
      setSubmitError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page">
      <h1>Submit your application</h1>
      <p className="page-subtitle">
        Tell us a bit about yourself and we’ll follow up with onboarding steps for the {projects.length} project
        {projects.length === 1 ? '' : 's'} in your bucket.
      </p>

      <div className="detail-body">
        <form className="detail-main application-form" onSubmit={handleSubmit} noValidate>
          <label>
            Full name
            <input value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Jordan Lee" />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </label>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="jordan@example.com"
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </label>
          <label>
            Phone number
            <input value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="(555) 123-4567" />
            {errors.phone && <span className="field-error">{errors.phone}</span>}
          </label>
          <label>
            Current school
            <input
              value={form.school}
              onChange={(e) => update('school', e.target.value)}
              placeholder="Springfield High School"
            />
            {errors.school && <span className="field-error">{errors.school}</span>}
          </label>
          <label>
            Grade
            <select value={form.grade} onChange={(e) => update('grade', e.target.value)}>
              <option value="">Select grade</option>
              {GRADES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            {errors.grade && <span className="field-error">{errors.grade}</span>}
          </label>

          {submitError && <span className="field-error">{submitError}</span>}
          <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit application'}
          </button>
        </form>

        <aside className="detail-sidebar">
          <h2 className="sidebar-heading">Your bucket</h2>
          <ul className="summary-list">
            {projects.map((p) => (
              <li key={p.id}>{p.title}</li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  )
}
