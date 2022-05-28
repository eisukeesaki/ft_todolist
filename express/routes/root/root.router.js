const rootRouter = require('express').Router();
const { isAuthenticated } = require('../sessions/sessions.controller');

rootRouter.get('/', isAuthenticated, (req, res) => {
  console.log(`req.sessionID:${JSON.stringify(req.sessionID)}`);
  res.render('login')
}); // TODO: use conditional statements to render either login or app

module.exports = rootRouter;

/*

    express router
        instantiate
        initialize
            route definitions

*/

