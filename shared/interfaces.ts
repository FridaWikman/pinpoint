export interface Delete {
  id: number
}
export interface Category extends Delete {
  name: string
  description: string | null
}

export interface Note extends Delete {
  author: string | null
  title: string | null
  content: string
  created: string
  updated: string
  categoryName: string
  category?: number
  categoryDescription: string | null
}
