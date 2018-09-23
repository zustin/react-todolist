import React, { Component, Fragment } from 'react';
import './style.css';
import TodoItem from './TodoItem';

class TodoList extends Component {
  constructor(props){
    super(props)
    this.state = {
      inputValue: '',
      list: []
    }
  }

  render() {
    return (
      <Fragment>
        <div>
          {/* 下面是一个input */}
          <label htmlFor="insertArea">输入内容：</label>
          <input
            id="insertArea"
            className="input"
            type="text"
            value={this.state.inputValue}
            onChange={this.handleInputChange.bind(this)}
          />
          <button onClick={this.handleBtnClick.bind(this)}>添加</button>
        </div>
        <ul>
          {
            this.state.list.map((item, index) => {
              return (
                <TodoItem 
                  key={index} 
                  content={item} 
                  index={index}
                  deleteItem={this.handleItemClick.bind(this)}
                />
              )
            })
          }
        </ul>
      </Fragment>
    )
  }

  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value
    })
  }

  handleBtnClick() {
    const list = [...this.state.list, this.state.inputValue];
    this.setState({
      list,
      inputValue: ''
    })
  }

  handleItemClick(index) {
    const list = [...this.state.list]
    list.splice(index, 1)
    this.setState({
      list
    })
  }
}

export default TodoList;