import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { loadBucket, saveBucket } from '../lib/storage'

const BucketContext = createContext(null)

export function BucketProvider({ children }) {
  const [bucket, setBucket] = useState(() => loadBucket())

  useEffect(() => saveBucket(bucket), [bucket])

  const addToBucket = useCallback((projectId) => {
    setBucket((prev) => (prev.includes(projectId) ? prev : [...prev, projectId]))
  }, [])

  const removeFromBucket = useCallback((projectId) => {
    setBucket((prev) => prev.filter((id) => id !== projectId))
  }, [])

  const clearBucket = useCallback(() => setBucket([]), [])

  const isInBucket = useCallback((projectId) => bucket.includes(projectId), [bucket])

  const value = useMemo(
    () => ({ bucket, addToBucket, removeFromBucket, clearBucket, isInBucket }),
    [bucket, addToBucket, removeFromBucket, clearBucket, isInBucket],
  )

  return <BucketContext.Provider value={value}>{children}</BucketContext.Provider>
}

export function useBucket() {
  const ctx = useContext(BucketContext)
  if (!ctx) throw new Error('useBucket must be used within a BucketProvider')
  return ctx
}
