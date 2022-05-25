const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('<h1>welcome to ft_todolist<h1/>');
});

module.exports = app;

