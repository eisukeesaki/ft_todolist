const indexRouter = require('express').Router();
const indexController = require('./index.controller');
const { isAuthenticated } = require('./sessions/sessions.controller');

indexRouter.get('/',
  isAuthenticated,
  indexController.renderIndex
); // TODO: use conditional statements to render either login or app

module.exports = indexRouter;

/*

    express router
        instantiate
        initialize
            route definitions

*/

