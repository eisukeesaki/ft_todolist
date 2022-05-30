const indexRouter = require('./index.router');
const sessionsRouter = require('./sessions/sessions.router');
const todosRouter = require('./todos/todos.router');
const usersRouter = require('./users/users.router');

function mountRoutes(express) {
  const basePath = '/';

  express.use(basePath, indexRouter);
  express.use(`${basePath}sessions`, sessionsRouter);
  express.use(`${basePath}todos`, todosRouter);
  express.use(`${basePath}users`, usersRouter);
}

module.exports = mountRoutes;

/*

    define route mounter function
        init and load all routers to this scope

*/

