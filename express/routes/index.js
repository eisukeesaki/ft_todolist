const rootRoutes = require('./root.routes');
const sessionsRoutes = require('./sessions.routes');
const usersRoutes = require('./user.routes');
// import other routes here

const basePath = '/api/v0';
module.exports = (express) => {
  express.use(basePath, rootRoutes);
  express.use(`${basePath}/sessions`, sessionsRoutes);
  express.use(`${basePath}/users`, usersRoutes);
  // ... other routes goes here
}

/*

    init and load all routers to this scope

    define route mounter function

*/

