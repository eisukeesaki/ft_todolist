const db = require(__rootDir + '/db');

async function insert(req, res) {
  // const queryStr = 'INSERT INTO todos (owner_id, title, completed) VALUES ($1, $2, $3)';
  // const queryStr = "INSERT INTO todos (owner_id, title, completed) VALUES (50, 'do sth', 0)";
  // const queryParams = [req.session.uid, req.body.title, req.body.completed];
  // const record = await db.query(queryStr);
  // const record = await db.query(queryStr, queryParams);

  // console.log(`record:\n${JSON.stringify(record, null, 2)}`);
  res.end();
}

module.exports = {
  insert
}

