import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShelfSelect extends Component {
  static propTypes = {
    shelf: PropTypes.string.isRequired
  }
  state = {
    value: this.props.shelf
  }
  handleChange = (event) => {
    event.preventDefault();
    this.setState({ value: event.target.value });
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