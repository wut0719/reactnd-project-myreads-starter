import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

class ShelfSelect extends Component {
  static propTypes = {
    bookId: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
    onUpdate: PropTypes.func
  }
  state = {
    value: this.props.shelf
  }
  handleChange = (event) => {
    event.preventDefault();
    this.setState({ value: event.target.value });
    BooksAPI.update({ id: this.props.bookId }, event.target.value).then(data => { this.props.onUpdate(); })
  }
  render() {
    const { value } = this.state;
    return (
      <div className="book-shelf-changer">
        <select value={value} onChange={this.handleChange}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default ShelfSelect;