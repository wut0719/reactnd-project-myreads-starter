import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import { PulseLoader } from 'halogenium';


/**
 * 搜索组件
 * 
 * 
 * 输入参数：
 * - myBooks，书库列表，array，必选
 * - changeShelf, 更改书架的回调函数，func，可选
 */
class Search extends Component {
  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    changeShelf: PropTypes.func
  }
  state = {
    query: '',
    loading: false,
    books: []
  }

  /**
   * 提交表单的回调函数
   */
  handleSubmit = (event) => {
    if (event.key === 'Enter') {
      // 只有在按下回车键时才提交
      this.setState({ loading: true });
      BooksAPI.search(this.state.query.trim()).then((books) => {
        // 将搜索结果与书库列表进行对比，增加shelf属性值
        if (books instanceof Array) {
          let myBooks = this.props.myBooks;
          let fbooks = books.map((book) => {
            for (let i = 0; i < myBooks.length; i++) {
              if (myBooks[i].id === book.id) {
                return { ...book, shelf: myBooks[i].shelf };
              }
            }
            return book;
          });
          this.setState({ books: fbooks });
        } else {
          // 查询结果为空
          this.setState({ books: [] });
        }
      }).finally(() => {
        this.setState({ loading: false });
      })
    }
  }
  
  /**
   * change事件的回调函数，控制input的value
   */
  handleChange = (event) => {
    this.setState({ query: event.target.value });
  }
  render() {
    const { query, loading, books } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={query} onChange={this.handleChange} onKeyPress={(event) => { this.handleSubmit(event) }} />
          </div>
        </div>
        <div className="search-books-results">
          {loading ? (
            <div className="loading">
              <PulseLoader color="#2e7c31" size="16px" margin="4px" />
            </div>
          ) : (
              <ol className="books-grid">{
                books.map((book) => (
                  <li key={book.id}>
                    <Book
                      id={book.id}
                      shelf={book.shelf || 'none'}
                      coverURL={book.imageLinks ? book.imageLinks.thumbnail : 'https://books.google.com/googlebooks/images/no_cover_thumb.gif'}
                      title={book.title}
                      authors={book.authors || ['UNKNOWN']}
                      changeShelf={() => { this.props.changeShelf() }}
                    />
                  </li>
                ))
              }</ol>
            )}
            {!loading && <p style={{textAlign:'center',color:'#999'}}>{books.length} Matched Books</p>}
        </div>
      </div>
    );
  }
}

export default Search;