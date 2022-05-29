const indexRouter = require('./index.router');
const sessionsRouter = require('./sessions/sessions.router');
const usersRouter = require('./users/users.router');

function mountRoutes(express) {
  const basePath = '/api/v0';

  express.use(basePath, indexRouter);
  express.use(`${basePath}/sessions`, sessionsRouter);
  express.use(`${basePath}/users`, usersRouter);
}

module.exports = mountRoutes;

/*

    init and load all routers to this scope

    define route mounter function

*/

