const db = require(__rootDir + '/db');

async function getById (req, res) {
  const rows = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
  res.send(rows.rows[0]);
}

module.exports = {
  getById
}

