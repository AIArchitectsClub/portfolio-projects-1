const BUCKET_KEY = 'projectbucket.bucket'
const STUDENT_INFO_KEY = 'projectbucket.studentInfo'

export function loadBucket() {
  try {
    const raw = localStorage.getItem(BUCKET_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveBucket(projectIds) {
  localStorage.setItem(BUCKET_KEY, JSON.stringify(projectIds))
}

export function loadStudentInfo() {
  try {
    const raw = localStorage.getItem(STUDENT_INFO_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveStudentInfo(info) {
  localStorage.setItem(STUDENT_INFO_KEY, JSON.stringify(info))
}
