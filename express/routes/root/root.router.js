const rootRouter = require('express').Router();
const rootController = require('../root/root.controller');
const { isAuthenticated } = require('../sessions/sessions.controller');

rootRouter.get('/',
  isAuthenticated,
  rootController.renderIndex
); // TODO: use conditional statements to render either login or app

module.exports = rootRouter;

/*

    express router
        instantiate
        initialize
            route definitions

*/

