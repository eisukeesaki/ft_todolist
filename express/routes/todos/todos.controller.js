const db = require(__rootDir + '/db');

async function insert(req, res) {
  try {
    const queryStr = 'INSERT INTO todos(owner_id, title, completed) VALUES($1, $2, $3)';
    const queryParams = [req.session.uid, req.body.title, req.body.completed];

    await db.query(queryStr, queryParams);

    res.end();
  } catch (error) {
    console.log(error.stack);
  }
}

module.exports = {
  insert
}

