import React from 'react';
import { Link } from 'react-router-dom';
import { Book, TypeId } from "../types";

interface Props {
  book: Book;
  deleteBook: (id: TypeId) => void;
  setChangeBook: (book:Book) => void
}

export const ItemBook: React.FC<Props> = ({ book, deleteBook, setChangeBook }) => {
  const {
    id, bookTitle, author, category, isbn,
  } = book;

  return (
    <>
      <tr>
        <td>{bookTitle}</td>
        <td>{author}</td>
        <td>{category}</td>
        <td>{isbn}</td>
        <td>
          <Link
            to='addBook'
            className="button is-primary is-outlined"
            onClick={() => setChangeBook(book)}
          >
            Edit book
          </Link>
        </td>
        <td>
          <button
            className="button is-danger is-outlined"
            onClick={() => deleteBook(id)}
          >
              Delete book
          </button>
        </td>
      </tr>
    </>
  );
};