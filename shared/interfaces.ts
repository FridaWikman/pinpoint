export interface Category {
  id: number
  name: string
  description: string | null
}
export interface Note {
  id: number
  author: string | null
  title: string | null
  content: string
  created: string
  updated: string
  categoryName: string
  categoryDescription: string | null
}
