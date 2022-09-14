import React, { useCallback, useEffect, useState } from "react"
import { Book, TypeId } from "../types"
import { patchBook, postBook } from "../utils/fetchBooks";
import { v4 as uuidv4 } from 'uuid';
import { Navigate } from "react-router-dom";

interface Props {
  changeBook: Book | null
  setChangeBook: (book: Book | null) => void;
}

export const AddBook: React.FC<Props> = ({ changeBook, setChangeBook }) => {
  const [titleBook, setTitleBook] = useState('');
  const [authorBook, setAuthorBook] = useState('');
  const [categoryBook, setCategoryBook] = useState('');
  const [isbnBook, setIsbnBook] = useState('');
  const [idBook, setIdBook] = useState<TypeId>('');
  const [redirect, setRedirect] = useState(false);

  const resetForm = useCallback(() => {
    setTitleBook('');
    setAuthorBook('');
    setCategoryBook('');
    setIsbnBook('');
    setIdBook('');
  }, [])

  useEffect(() => {
    if (changeBook !== null) {
      setTitleBook(changeBook.bookTitle);
      setAuthorBook(changeBook.author);
      setCategoryBook(changeBook.category);
      setIsbnBook(changeBook.isbn);
      setIdBook(changeBook.id);
    } else if (changeBook === null) {
      resetForm();
    }
  }, [changeBook, resetForm])

  const handlerChangeBook = () => {
    const newData = {
      ...changeBook,
      bookTitle: titleBook,
      author: authorBook,
      category: categoryBook || '',
      isbn: isbnBook,
      id: isbnBook
    };

    patchBook(idBook, newData);
  };

  const handlerAddBook = () => {
    const newData = {
      bookTitle: titleBook,
      author: authorBook,
      category: categoryBook || '',
      isbn: isbnBook,
      id: uuidv4(),
    };

    postBook(newData);
  };

  const addOrChange = () => {
    setRedirect(true);

    return changeBook === null ? handlerAddBook() : handlerChangeBook()
  }

  return (
    <>
      <h1 className="title">Add book</h1>
      <form onSubmit={(event) => {
        event.preventDefault();
        addOrChange();
        setChangeBook(null);
        resetForm();
      }}>
        <div className="field">
          <label className="label">Book title</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Textinput"
              required
              value={titleBook}
              onChange={(event) => setTitleBook(event?.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Author</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Text input"
              required
              value={authorBook}
              onChange={(event) => setAuthorBook(event?.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Category</label>
          <div className="control">
            <div className="select">
              <select
                value={categoryBook}
                onChange={(event) => setCategoryBook(event.target.value)}
                required
              >
                <option disabled selected value=''>Category selection</option>
                <option>Mysteries</option>
                <option>Animals</option>
                <option>Historical</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">ISBN</label>
          <div className="control">
            <input
              className={"input"}
              type="number"
              placeholder="0000000000000"
              value={isbnBook}
              required
              minLength={10}
              onChange={(event) => setIsbnBook(event?.target.value)}
            />
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              className="button is-link"
            >
              Submit
            </button>
          </div>
          <div className="control">
            <button
              className="button is-link is-light"
              onClick={() => {
                setChangeBook(null);
                setTitleBook('');
                setRedirect(true);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      {redirect && <Navigate to="/" replace={true} />}
    </>
  )
}