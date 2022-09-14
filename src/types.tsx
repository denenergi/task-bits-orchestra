export interface Book {
  id: TypeId,
  bookTitle: string,
  author: string,
  category: string,
  isbn: string 
}

export type TypeId = string | number;