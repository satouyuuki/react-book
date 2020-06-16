const express = require('express');
const app = express();
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let todos = [];
let nextId = 1;

app.get('/', (req, res) => {
  res.render('index', { todos: todos });
});

app.post('/todos/add', (req, res) => {
  const newTodo = {
    id: nextId++,
    text: req.body.text
  };
  todos.push(newTodo);
  res.redirect('/');
});

app.post('/todos/delete/:id', (req, res) => {
  todos = todos.filter((todo) => todo.id !== Number(req.params.id));
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});