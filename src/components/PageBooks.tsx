import React, { useEffect, useState } from 'react';
import { Book, TypeId } from "../types";
import { ItemBook } from "./ItemBook";
import { Loader } from './Loader/Loader';
import { Link } from 'react-router-dom';
import { deleteBook, getBooks } from '../utils/fetchBooks';

interface Props {
  setChangeBook: (book: Book) => void;
  changeBook: Book | null;
}

export const PageBooks: React.FC<Props> = ({ setChangeBook, changeBook }) => {
  const [books, setBooks] = useState<Book[] | []>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const intervalGetBooks = () => {
      getBooks()
      .then(res => setBooks(res))
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(true));
    }

    setTimeout(intervalGetBooks, 300);
  }, []);

  const deleteBookFromServer = (id: TypeId) => {
    deleteBook(id)
      .then(() => books.filter(books => books.id !== id))
      .then(res => {
        setBooks(res);
      }).catch(() => setError('Unable to delete a todo'));
  }

  return (
    <>
      <h1 className="title">Books page</h1>
      <div className="container">
        <div className="block">
          <div className="box table-container">
            {isLoading
              ? (
                <>
                  {error === 'Something went wrong' && (
                    <p
                      data-cy="peopleLoadingError"
                      className="has-text-danger"
                    >
                      Something went wrong
                    </p>
                  )}

                  {error === '' && books.length === 0 && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}
                  <table
                    data-cy="peopleTable"
                    className="
                      table
                      is-striped is-hoverable
                      is-narrow is-fullwidth"
                  >
                    <thead>
                      <tr>
                        <th>Book title</th>
                        <th>Author name</th>
                        <th>Category</th>
                        <th>ISBN</th>
                        <th>Edit book</th>
                        <th>Delete book</th>
                      </tr>
                    </thead>

                    <tbody>
                      {books.map(book => (
                        <ItemBook
                          book={book}
                          key={book.id}
                          deleteBook={deleteBookFromServer}
                          setChangeBook={setChangeBook}
                        />
                      ))}
                    </tbody>
                  </table>
                  <Link to="addBook">
                    <button
                      className="button is-info is-outlined"
                    >
                      Add book
                      </button>
                  </Link>
                </>
              )
              : <Loader />}
          </div>
        </div>
      </div>
    </>
  )
}