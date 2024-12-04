export interface CategoryDb {
  category_id: number
  category_name: string
  category_description: string | null
}

export interface NoteDb {
  note_id: number
  note_author: string | null
  note_title: string | null
  note_content: string
  note_created: string
  note_updated: string
  category_name: string
  category_description: string | null
}
