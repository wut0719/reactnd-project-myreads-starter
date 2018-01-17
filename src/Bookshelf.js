import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class Bookshelf extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    books: PropTypes.array
  }
  render() {
    const { type, title, books } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.filter((book) => (book.shelf === type)).map((book) => (
              <li key={book.id}>
                <Book
                  shelf={book.shelf}
                  coverURL={book.imageLinks.thumbnail}
                  title={book.title}
                  authors={book.authors}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf;