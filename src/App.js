import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Bookshelf from './Bookshelf';
import Search from './Search';
import { PulseLoader } from 'halogenium';

import './App.css';

const BOOKSHELF_TYPES = {
  READING: 'currentlyReading',
  TOREAD: 'wantToRead',
  READ: 'read'
}

class BooksApp extends React.Component {
  state = {
    books: [],
    loading: true
  }

  componentDidMount() {
    this.updateBooks();
  }

  updateBooks() {
    this.setState({ loading: true });
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books, loading: false });
    });
  }

  render() {
    const { books, loading } = this.state;
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              {loading ? (
                <div className="loading">
                  <PulseLoader color="#2e7c31" size="16px" margin="4px" />
                </div>
              ) : (
                  <div>
                    <Bookshelf type={BOOKSHELF_TYPES.READING} title='Currently Reading' books={books} changeShelf={() => { this.updateBooks() }} />
                    <Bookshelf type={BOOKSHELF_TYPES.TOREAD} title='Want to Read' books={books} changeShelf={() => { this.updateBooks() }} />
                    <Bookshelf type={BOOKSHELF_TYPES.READ} title='Read' books={books} changeShelf={() => { this.updateBooks() }} />
                  </div>
                )}
            </div>
            <div className="open-search">
              <Link to="/search" >Add a book</Link>
            </div>
          </div>
        )} />
        <Route exact path='/search' render={() => (
          <Search myBooks={books} changeShelf={() => { this.updateBooks() }} />
        )} />
      </div>
    )
  }
}

export default BooksApp
