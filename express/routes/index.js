const rootRoutes = require('./root.routes');
const usersRoutes = require('./user.routes');
// import other routes here

module.exports = (express) => {
  express.use('/api/v0', rootRoutes);
  express.use('/api/v0/users', usersRoutes);
  // ... other routes goes here
}

/*

    init and load all routers to this scope

    define route mounter function

*/

