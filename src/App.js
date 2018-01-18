import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Bookshelf from './Bookshelf';
import Search from './Search';
import './App.css';

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
    this.updateBooks();
  }

  updateBooks() {
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
                <Bookshelf type={BOOKSHELF_TYPES.READING} title='Currently Reading' books={books} changeShelf={() => { this.updateBooks() }} />
                <Bookshelf type={BOOKSHELF_TYPES.TOREAD} title='Want to Read' books={books} changeShelf={() => { this.updateBooks() }} />
                <Bookshelf type={BOOKSHELF_TYPES.READ} title='Read' books={books} changeShelf={() => { this.updateBooks() }} />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search" >Add a book</Link>
            </div>
          </div>
        )} />
        <Route exact path='/search' render={() => (
          <Search changeShelf={()=>{this.updateBooks()}}/>
        )} />
      </div>
    )
  }
}

export default BooksApp
