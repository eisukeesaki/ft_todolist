const Router = require('express-promise-router');
const sessionsController = require('./sessions.controller');
const sessionsRouter = new Router();

sessionsRouter.post('/',
  sessionsController.authenticate,
  sessionsController.createSession
);

sessionsRouter.delete('/',
  sessionsController.isAuthenticated,
  sessionsController.destroySession
);

module.exports = sessionsRouter;

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

