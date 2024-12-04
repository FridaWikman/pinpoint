import cors from 'cors'
import { Request, Response } from 'express'
import express from 'express'
import * as dotenv from 'dotenv'
import { Client } from 'pg'
import { CategoryDb, NoteDb } from './interfaces'
import { Category, Note } from '../shared/interfaces'

dotenv.config()

const client = new Client({
  connectionString: process.env.PGURI,
})

client.connect()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/api/notes', async (_req: Request, res: Response<Note[]>) => {
  const { rows } = await client.query<NoteDb>(
    'SELECT notes.note_id, notes.note_author, notes.note_title, notes.note_content, notes.note_created_at, notes.note_updated_at, categories.category_name, categories.category_description FROM notes JOIN categories ON categories.category_id = notes.note_category'
  )
  const notes: Note[] = rows.map((row) => ({
    id: row.note_id,
    author: row.note_author,
    title: row.note_title,
    content: row.note_content,
    created: row.note_created_at,
    updated: row.note_updated_at,
    categoryName: row.category_name,
    categoryDescription: row.category_description,
  }))
  res.send(notes)
})

app.get('/api/categories', async (_req: Request, res: Response<Category[]>) => {
  const { rows } = await client.query<CategoryDb>('SELECT * FROM categories')

  const categories: Category[] = rows.map((row) => ({
    id: row.category_id,
    name: row.category_name,
    description: row.category_description,
  }))

  res.send(categories)
})

app.listen(port, () => {
  console.log(`Redo på http://localhost:${port}/`)
})
