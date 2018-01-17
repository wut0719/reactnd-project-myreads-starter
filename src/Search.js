import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class Search extends Component {
  state = {
    query: '',
    books: []
  }
  handleSubmit = (event) => {
    if (event.key === 'Enter') {
      BooksAPI.search(this.state.query).then((sbooks) => {
        this.setState({ books: sbooks });
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
                  shelf="none"
                  coverURL={book.imageLinks.thumbnail}
                  title={book.title}
                  authors={book.authors || ['UNKNOWN']}
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