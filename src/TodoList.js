import React, { Component, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios';
import TodoItem from './TodoItem';
import './style.css';

class TodoList extends Component {
  constructor(props){
    super(props)
    this.state = {
      inputValue: '',
      list: [],
      show: true
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleBtnClick = this.handleBtnClick.bind(this)
    this.handleItemClick = this.handleItemClick.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  render() {
    return (
      <Fragment>
        <CSSTransition
          in={this.state.show}
          timeout={1000}
          classNames="fade"
          unmountOnExit
          appear={true}
        >
          <p>hello world</p>
        </CSSTransition>
        <button onClick={this.handleToggle}>是否显示</button>
        <div>
          {/* 下面是一个input */}
          <label htmlFor="insertArea">输入内容：</label>
          <input
            id="insertArea"
            className="input"
            type="text"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleBtnClick}>添加</button>
        </div>
        <ul>
          <TransitionGroup>{this.getTodoItem()}</TransitionGroup>
        </ul>
      </Fragment>
    )
  }


  componentDidMount() {
    axios.get('api/todolist').then((res) => {
      console.log(res.data)
      this.setState(() => ({
        list: [...res.data]
      }))
    }).catch(() => {
      console.log('err')
    })
  }

  getTodoItem() {
    return this.state.list.map((item, index) => {
      return (
        <CSSTransition
          key={index} 
          timeout={1000}
          classNames="fade"
          unmountOnExit
          appear={true}
        >
          <TodoItem 
            content={item} 
            index={index}
            deleteItem={this.handleItemClick}
          />
        </CSSTransition>
      )
    })
  }

  handleToggle() {
    this.setState((prevState) => ({
      show: !prevState.show
    }))
  }

  handleInputChange(e) {
    const inputValue = e.target.value
    this.setState(() => ({
      inputValue
    }))
  }

  handleBtnClick() {
    this.setState((prevState) => ({
      list: [...prevState.list, prevState.inputValue],
      inputValue: ''
    }))
  }

  handleItemClick(index) {
    this.setState((prevState) => {
      const list  = [...prevState.list]
      list.splice(index, 1)
      return {
        list
      }
    })
  }
}

export default TodoList;