import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectShelf from './SelectShelf';

class Book extends Component {
  static propTypes = {
    coverURL: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired
  }
  render() {
    const { coverURL, title, authors } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${coverURL})` }}></div>
          <SelectShelf />
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.join(', ')}</div>
      </div>
    );
  }
}

export default Book;