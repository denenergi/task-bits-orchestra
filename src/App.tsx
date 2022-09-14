import 'bulma/css/bulma.css';
import './App.css';
import React, { useState } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import { AddBook } from './components/AddBook';
import { PageBooks } from './components/PageBooks';
import { PageNotFound } from './components/PageNotFound';
import classNames from 'classnames'
import { Book } from './types';

const App: React.FC = () => {
  const [changeBook, setChangeBook] = useState<Book | null>(null)

  return (
    <>
      <nav className="navbar is-fixed-top is-mobile has-shadow" data-cy="nav">
        <div className="container">
          <div className="navbar-menu">
            <div className="navbar-start">
              <NavLink
                to="/"
                replace
                className={({ isActive }) => classNames('navbar-item',
                  { 'is-active': isActive })}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="addBook"
                className={({ isActive }) => classNames('navbar-item',
                  { 'is-active': isActive })}
                replace
              >
                Add book
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      <div className="section">
        <div className="container">
          <Routes>
            <Route
              path="*"
              element={
                <PageNotFound />
              }
            />
            <Route
              path="/"
              element={
                <PageBooks setChangeBook={setChangeBook} changeBook={changeBook} />
              }
            />
            <Route
              path="addBook"

              element={
                <AddBook changeBook={changeBook} setChangeBook={setChangeBook} />
              }
            />
          </Routes>
        </div>
      </div>
    </>
  )
};

export default App;
