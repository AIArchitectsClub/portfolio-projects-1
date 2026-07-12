import pg from 'pg'
import 'dotenv/config'

const { Pool, types } = pg

// Return DATE columns as plain 'YYYY-MM-DD' strings instead of JS Date
// objects, which pg would otherwise parse at UTC midnight and shift
// depending on the server's timezone. OID 1082 = date.
types.setTypeParser(1082, (value) => value)

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set. Copy .env.example to .env and fill it in.')
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})
