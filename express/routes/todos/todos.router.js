const Router = require('express-promise-router');
const { isAuthenticated } = require('../sessions/sessions.controller');
const todosController = require('./todos.controller');
const db = require(__rootDir + '/db');

const todosRouter = new Router();

todosRouter.post('/',
  isAuthenticated,
  todosController.insert
);

// todosRouter.put('/:id',
//   isAuthenticated,
//   todosController.update
// ); // must make HTTP client(e.g Axios) send requests to use this route

// todosRouter.delete('/:id',
//   isAuthenticated,
//   todosController.destroy
// ); // must make HTTP client(e.g Axios) send requests to use this route 

todosRouter.post('/:id',
  isAuthenticated,
  todosController.updateOrDestroy
); // dirty workaround to trigger DELETE operation using HTML forms.

module.exports = todosRouter;


