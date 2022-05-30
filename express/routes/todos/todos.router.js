const Router = require('express-promise-router');
const { isAuthenticated } = require('../sessions/sessions.controller');
const todosController = require('./todos.controller');
const db = require(__rootDir + '/db');

const todosRouter = new Router();

todosRouter.post('/',
  isAuthenticated,
  todosController.insert
);

todosRouter.delete('/:id',
  isAuthenticated,
  todosController.destroy
);

module.exports = todosRouter;

