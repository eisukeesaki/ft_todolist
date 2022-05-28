const rootRouter = require('./root/root.router');
const sessionsRouter = require('./sessions/sessions.router');
const usersRouter = require('./users/users.router');
// import other routes here

const basePath = '/api/v0';
module.exports = (express) => {
  express.use(basePath, rootRouter);
  express.use(`${basePath}/sessions`, sessionsRouter);
  express.use(`${basePath}/users`, usersRouter);
  // ... other routes goes here
}

/*

    init and load all routers to this scope

    define route mounter function

*/

