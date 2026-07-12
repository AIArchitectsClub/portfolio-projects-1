import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import 'dotenv/config'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './auth.js'
import projectsRouter from './routes/projects.js'
import applicationsRouter from './routes/applications.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, '..', 'dist')

const app = express()
app.set('trust proxy', 1)

// Must come before express.json() — Better Auth needs the raw request body.
app.all('/api/auth/*splat', toNodeHandler(auth))

app.use(express.json())

app.use('/api/projects', projectsRouter)
app.use('/api/applications', applicationsRouter)
app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }))

app.use(express.static(distDir))
app.use((req, res) => res.sendFile(path.join(distDir, 'index.html')))

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`))
