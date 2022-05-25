const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

const mountRoutes = require('./routes');
mountRoutes(app);

app.get('/', (req, res) => {
  res.send('<h1>welcome to ft_todolist<h1/>');
});

module.exports = app;

