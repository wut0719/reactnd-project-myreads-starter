import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class Bookshelf extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func
  }
  render() {
    const { type, title, books } = this.props;
    let shelfBooks = books.filter((book) => (book.shelf === type));
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          {shelfBooks.length === 0 ? (
            <div className="page-placeholder">IT IS EMPTY</div>
          ) : (
              <ol className="books-grid">
                {shelfBooks.map((book) => (
                  <li key={book.id}>
                    <Book
                      id={book.id}
                      shelf={book.shelf}
                      coverURL={book.imageLinks.thumbnail}
                      title={book.title}
                      authors={book.authors}
                      changeShelf={() => { this.props.changeShelf() }}
                    />
                  </li>
                ))}
              </ol>
            )}
        </div>
      </div>
    )
  }
}

export default Bookshelf;