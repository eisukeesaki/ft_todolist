const router = require('express').Router();

router.get('/', (req, res) => {
  console.log(`req.sessionID:${JSON.stringify(req.sessionID)}`);
  res.render('login')
}); // TODO: use conditional statements to render either login or app

module.exports = router;

/*

    express router
        instantiate
        initialize
            route definitions

*/

