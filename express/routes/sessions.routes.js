const Router = require('express-promise-router');
const db = require('../../db');
const router = new Router();

router.post('/', async (req, res) => {
  // console.log(`req.body.email:${JSON.stringify(req.body.email)}`);
  const queryStr = 'SELECT password from users where email = $1';
  const queryParams = [req.body.email];
  const pwd = (await db.query(queryStr, queryParams)).rows[0].password;
  if (req.body.password == pwd) {
    req.session.regenerate((err) => {
      if (err) next(err);

      req.session.user = req.body.email;
      // <req.sessionID is automatically generated and stored>
      req.session.save((err) => {
        if (err) next(err);

        console.log(`req.session.user:${JSON.stringify(req.session.user)}`);
        console.log(`req.sessionID:${req.sessionID}`);
        res.redirect(200, '/');
      });
    });
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

