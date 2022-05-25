const Router = require('express-promise-router');
const db = require('../../db');

const router = new Router();

module.exports = router;

router.get('/:id', async (req, res) => {
  const rows = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
  res.send(rows.rows[0]);
});

