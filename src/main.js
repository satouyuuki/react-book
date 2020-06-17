import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      todos: [],
      newText: ''
    };
  }

  handleChange(e) {
    this.setState({
      newText: e.target.value
    });
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/todos')
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          todos: data.todos
        })
      })
      .catch((err) => console.log(err))
  }

  addTodo() {
    if (this.state.newText === '') return;
    const newTodo = {
      text: this.state.newText
    }
    fetch(`http://localhost:3000/api/todos`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    })
      .then((res) => res.json())
      .then((data) => {
        const todos = this.state.todos;
        todos.push(data.createdTodo);
        this.setState({ todos: todos });
        this.setState({ newText: '' });
      })
    .catch((err) => console.log(err))
  }

  deleteTodo(id) {
    fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'delete'
    })
      .then(() => {
        let todos = this.state.todos;
        todos = todos.filter((todo) => todo.id !== id);
        this.setState({ todos: todos });
      })
    .catch((err) => console.log(err))
  }

  render() {
    return (
      <div>
        <h3>My Todo</h3>
        <input
          value={this.state.newText}
          onChange={this.handleChange.bind(this)}
          placeholder="Input here..."
        />
        <button onClick={this.addTodo.bind(this)}>ADD</button>
        <h5>Todo List</h5>
        <ul>
          {
            this.state.todos.map((todo) => {
              return (
                <li key={todo.id}>
                  {todo.text}
                  <button onClick={this.deleteTodo.bind(this, todo.id)}>DEL</button>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('app'));