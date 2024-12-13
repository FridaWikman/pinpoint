export interface DeleteCategory {
  id: number
}

export interface Category extends DeleteCategory {
  name: string
  description: string | null
}

export interface DeleteNote {
  id: number
}

export interface Note extends DeleteNote {
  author: string | null
  title: string | null
  content: string
  created: string
  updated: string
  categoryName: string
  category?: number
  categoryDescription: string | null
}
