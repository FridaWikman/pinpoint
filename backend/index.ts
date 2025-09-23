import cors from "cors";
import { Request, Response } from "express";
import express from "express";
import * as dotenv from "dotenv";
import { Client } from "pg";
import {
  CategoryDb,
  NoteDb,
  DeleteCategoryDb,
  DeleteNoteDb,
} from "./interfaces/interfaces";
import { Category, Note, Delete } from "../shared/interfaces";

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/notes", async (_req: Request, res: Response<Note[]>) => {
  try {
    const { rows } = await client.query<NoteDb>(
      "SELECT notes.note_id, notes.note_author, notes.note_title, notes.note_content, notes.note_created_at, notes.note_updated_at, categories.category_name, categories.category_description FROM notes JOIN categories ON categories.category_id = notes.note_category ORDER BY notes.note_created_at ASC"
    );
    const notes: Note[] = rows.map((row) => ({
      id: row.note_id,
      author: row.note_author,
      title: row.note_title,
      content: row.note_content,
      created: row.note_created_at,
      updated: row.note_updated_at,
      categoryName: row.category_name,
      categoryDescription: row.category_description,
    }));
    res.send(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).send();
  }
});

app.get("/api/categories", async (_req: Request, res: Response<Category[]>) => {
  try {
    const { rows } = await client.query<CategoryDb>("SELECT * FROM categories");

    const categories: Category[] = rows.map((row) => ({
      id: row.category_id,
      name: row.category_name,
      description: row.category_description,
    }));

    res.send(categories);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).send();
  }
});

app.post("/api/add-note", async (req: Request, res: Response) => {
  const { author, title, content, category } = req.body as Note;
  try {
    const { rows } = await client.query<NoteDb>(
      "INSERT INTO notes (note_author, note_title, note_content, note_category) VALUES ($1,$2,$3,$4) RETURNING *",
      [author, title, content, category]
    );
    res.status(201).json(rows);
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).send("Server error");
  }
});

app.post("/api/add-category", async (req: Request, res: Response) => {
  const { name, description } = req.body as Category;
  try {
    const { rows } = await client.query<CategoryDb>(
      "INSERT INTO categories (category_name, category_description) VALUES ($1,$2) RETURNING *",
      [name, description]
    );
    res.status(201).json(rows);
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).send("Server error");
  }
});

app.put("/api/update-note/:id", async (req: Request, res: Response) => {
  const { author, title, content, category } = req.body as Note;
  const { id } = req.params;

  try {
    const { rows } = await client.query<NoteDb>(
      "UPDATE notes SET note_author = $1, note_title = $2, note_content = $3, note_category = $4 WHERE note_id = $5 RETURNING *",
      [author, title, content, category, id]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).send("Server error");
  }
});

app.delete("/api/delete-note", async (req: Request, res: Response) => {
  const { id } = req.body as Delete;
  try {
    await client.query<DeleteNoteDb>("DELETE FROM notes WHERE note_id = $1", [
      id,
    ]);
    res.status(200).send();
  } catch (error) {
    console.error("Error deleting", error);
    res.status(500).send("Server error");
  }
});

app.delete("/api/delete-category", async (req: Request, res: Response) => {
  const { id } = req.body as Delete;
  try {
    await client.query<DeleteCategoryDb>(
      "DELETE FROM categories WHERE category_id = $1",
      [id]
    );
    res.status(200).send();
  } catch (error) {
    console.error("Error deleting", error);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Redo på http://localhost:${port}/`);
});
