import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf';
import './App.css';
import Link from 'react-router-dom/Link';

const BOOKSHELF_TYPES = {
  READING: 'currentlyReading',
  TOREAD: 'wantToRead',
  READ: 'read'
}

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
    });
  }

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf type={BOOKSHELF_TYPES.READING} title='Currently Reading' books={books} />
                <Bookshelf type={BOOKSHELF_TYPES.TOREAD} title='Want to Read' books={books} />
                <Bookshelf type={BOOKSHELF_TYPES.READ} title='Read' books={books} />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search" >Add a book</Link>
            </div>
          </div>
        )} />
        <Route exact path='/search' render={({ history }) => (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => { history.push('/') }}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
