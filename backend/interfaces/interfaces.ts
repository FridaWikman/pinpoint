export interface DeleteCategoryDb {
  category_id: number
}
export interface DeleteNoteDb {
  note_id: number
}
export interface CategoryDb extends DeleteCategoryDb {
  category_name: string
  category_description: string | null
}

export interface NoteDb extends DeleteNoteDb {
  note_author: string | null
  note_title: string | null
  note_content: string
  note_created_at: string
  note_updated_at: string
  category_name: string
  category_description: string | null
}
