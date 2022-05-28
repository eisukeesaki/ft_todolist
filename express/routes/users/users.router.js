const Router = require('express-promise-router');
const db = require(__rootDir + '/db');
const router = new Router();

router.get('/:id', async (req, res) => {
  const rows = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
  res.send(rows.rows[0]);
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

