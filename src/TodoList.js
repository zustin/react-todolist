import React, { Component, Fragment } from 'react';

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
          <input 
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
                <li 
                  key={index}
                  onClick={this.handleItemClick.bind(this, index)}
                >
                  {item}
                </li>
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