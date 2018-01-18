import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class Search extends Component {
  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    changeShelf: PropTypes.func
  }
  state = {
    query: '',
    books: []
  }
  handleSubmit = (event) => {
    if (event.key === 'Enter') {
      BooksAPI.search(this.state.query.trim()).then((books) => {
        let myBooks = this.props.myBooks;
        console.dir(myBooks);
        let fbooks = books.map((book) => {
          for (let i = 0; i < myBooks.length; i++) {
            if (myBooks[i].id === book.id) {
              return { ...book, shelf: myBooks[i].shelf };
            }
          }
          return book;
        });
        console.dir(fbooks);
        this.setState({ books: fbooks });
      })
    }
  }
  handleChange = (event) => {
    this.setState({ query: event.target.value });
  }
  render() {
    const { query, books } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={query} onChange={this.handleChange} onKeyPress={(event) => { this.handleSubmit(event) }} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">{
            books.length > 0 && books.map((book) => (
              <li key={book.id}>
                <Book
                  id={book.id}
                  shelf={book.shelf || 'none'}
                  coverURL={book.imageLinks.thumbnail}
                  title={book.title}
                  authors={book.authors || ['UNKNOWN']}
                  changeShelf={() => { this.props.changeShelf() }}
                />
              </li>
            ))
          }</ol>
        </div>
      </div>
    );
  }
}

export default Search;