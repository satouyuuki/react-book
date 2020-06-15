import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: ''
    }
  }

  handleChange(e) {
    this.setState({ newTodo: e.target.value });
  }

  addTodo() {
    if (this.state.newTodo === '') return;
    const todos = this.state.todos;
    todos.push(this.state.newTodo);
    this.setState({ todos: todos });
    this.setState({ newTodo: '' });
  }

  deleteTodo(i) {
    const todos = this.state.todos;
    todos.splice(i, 1);
    this.setState({ todos: todos });
  }

  render() {
    return (
      <div>
        <h3>My Todo</h3>
        <input
          value={this.state.newTodo}
          onChange={this.handleChange.bind(this)}
          placeholder="Input here..."
        />
        <button onClick={this.addTodo.bind(this)}>ADD</button>
        <h5>Todo list</h5>
        <ul>
          {
            this.state.todos.map((todo, i) => {
              return (
                <li key={i}>
                  {todo}
                  <button onClick={this.deleteTodo.bind(this, i)}>DEL</button>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

// export default App;
ReactDOM.render(<App />, document.getElementById('content'));