const usersRoutes = require('./user.routes');
// import other routes here

module.exports = (app) => {
  app.use('/api/v0/users', usersRoutes);
  // ... other routes goes here
}

