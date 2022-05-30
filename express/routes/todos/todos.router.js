const Router = require('express-promise-router');
const { isAuthenticated } = require('../sessions/sessions.controller');
const todosController = require('./todos.controller');
const db = require(__rootDir + '/db');

const todosRouter = new Router();

todosRouter.post('/',
  isAuthenticated,
  todosController.insert
);

todosRouter.post('/:id',
  isAuthenticated,
  todosController.destroy
);

// todosRouter.delete('/:id',
//   isAuthenticated,
//   todosController.destroy
// ); // not used by server-side rendered UI

todosRouter.put('/:id',
  isAuthenticated,
  todosController.update
); // not used by server-side rendered UI

module.exports = todosRouter;

