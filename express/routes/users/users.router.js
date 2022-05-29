const Router = require('express-promise-router');
const usersController = require('./users.controller');
const usersRouter = new Router();

usersRouter.get('/:id',
  usersController.getById
);

module.exports = usersRouter;

/*

    express-promise-router
        what
            identical to express.Router() except it allows use of async/await for route handler functions
        instantiate
        initialize
            route definitions
                mountpaths
                handler functions

*/

