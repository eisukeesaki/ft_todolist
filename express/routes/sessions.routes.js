const Router = require('express-promise-router');
const db = require('../../db');
const router = new Router();

router.post('/', async (req, res) => {
  const queryStr = 'SELECT password from users where email = $1';
  const queryParams = [req.body.email];
  const pwd = (await db.query(queryStr, queryParams)).rows[0].password;
  if (req.body.password == pwd) {
    res.redirect(200, '/');
  } else {
      res.redirect(401, '/');
    }
});

module.exports = router;

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

