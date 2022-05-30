const Router = require('express-promise-router');
const sessionsController = require('./sessions.controller');
const sessionsRouter = new Router();

sessionsRouter.post('/',
  sessionsController.authenticate,
  sessionsController.createSession
);

// sessionsRouter.delete('/',
//   sessionsController.isAuthenticated,
//   sessionsController.destroySession
// ); // must make HTTP client(e.g Axios) send requests to use this route

sessionsRouter.post('/delete',
  sessionsController.isAuthenticated,
  sessionsController.destroySession
); // dirty workaround to trigger DELETE operation using HTML forms. /delete violates REST constraints sincie it's not a noun

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

