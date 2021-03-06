import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

/**
 * 书架组件
 * 
 * 
 * 输入参数：
 * - type，书架类型，string，必选
 * - title，书架名称，string，必选
 * - books，书库列表，array，必选
 * - changeShelf, 更改书架的回调函数，func，可选
 */
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
                      coverURL={book.imageLinks ? book.imageLinks.thumbnail : 'https://books.google.com/googlebooks/images/no_cover_thumb.gif'}
                      title={book.title}
                      authors={book.authors || ['UNKNOWN']}
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