import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

/**
 * 书架选择组件，受控select
 * 
 * 
 * 输入参数：
 * - shelf，所属书架，string，必选
 * - bookId，书籍id，string，必选
 * - onUpdate, 更改书架的回调函数，func，可选
 */
class ShelfSelect extends Component {
  static propTypes = {
    bookId: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
    onUpdate: PropTypes.func
  }
  state = {
    value: this.props.shelf
  }

  /**
   * change事件的回调函数，发起update请求
   */
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
          <option value="-" disabled>Move to...</option>
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