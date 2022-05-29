const Router = require('express-promise-router');
const { isAuthenticated } = require('../sessions/sessions.controller');
const todosController = require('./todos.controller');
const db = require(__rootDir + '/db');

const todosRouter = new Router();

todosRouter.post('/',
  isAuthenticated,
  todosController.insert
);

module.exports = todosRouter;

