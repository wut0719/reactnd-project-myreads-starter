import React, { Component } from 'react';
import ShelfSelect from './ShelfSelect';
import PropTypes from 'prop-types';

class Book extends Component {
  static propTypes = {
    shelf: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    coverURL: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    changeShelf: PropTypes.func
  }
  render() {
    const { id, shelf, coverURL, title, authors, changeShelf } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${coverURL})`,backgroundSize:'cover' }}></div>
          <ShelfSelect shelf={shelf} bookId={id} onUpdate={()=>{changeShelf()}} />
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.join(', ')}</div>
      </div>
    );
  }
}

export default Book;