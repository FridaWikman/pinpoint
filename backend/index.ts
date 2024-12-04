import cors from 'cors'
import { Request, Response } from 'express'
import express from 'express'
import * as dotenv from 'dotenv'
import { Client } from 'pg'
import { CategoryDb } from './interfaces'

interface Category {
  id: number
  name: string
  description: string
}

dotenv.config()

const client = new Client({
  connectionString: process.env.PGURI,
})

client.connect()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/api/categories', async (_req: Request, res: Response<Category[]>) => {
  const { rows } = await client.query<CategoryDb>('SELECT * FROM categories')

  const categories: Category[] = rows.map((row) => ({
    id: row.categoryid,
    name: row.categoryname,
    description: row.categorydescription,
  }))

  res.send(categories)
})

app.listen(port, () => {
  console.log(`Redo på http://localhost:${port}/`)
})
