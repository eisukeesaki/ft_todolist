const db = require(__rootDir + '/db');

async function insert(req, res) {
  try {
    const queryStr = 'INSERT INTO todos(owner_id, title, completed) VALUES($1, $2, $3)';
    const queryParams = [req.session.uid, req.body.title, req.body.completed];

    await db.query(queryStr, queryParams);
    // TODO: handle case result.rowCount == 0
    res.status(201).end();
  } catch (error) {
    console.log(error.stack);
  }
}

async function destroy(req, res) {
  try {
    const queryStr = 'DELETE FROM todos WHERE id = $1 AND owner_id = $2';
    const queryParams = [req.params.id, req.session.uid];

    const rowsAffected = (await db.query(queryStr, queryParams)).rowsAffected;

    if (rowsAffected)
      res.status(200).end();
    else
      res.status(500).send("We are not certain, but you probably don't own the resource."); // no db record was modified. possible reason is because the requester does not own the resource. db did not find any record that satisfies WHERE clause.
  } catch (error) {
    console.log(error.stack);
  }
}

async function update(req, res) {
  try {
    console.log('executing todosController.update...\n');
    console.log(`req.params:\n${JSON.stringify(req.params, null, 2)}\n`);
    console.log(`req.body:\n${JSON.stringify(req.body, null, 2)}\n`);
    const queryStr = 'UPDATE todos SET title = $1, completed = $2 WHERE id = $3 AND owner_id = $4';
    const queryParams = [req.body.title, req.body.completed, req.params.id, req.session.uid];

    const rowsAffected = (await db.query(queryStr, queryParams)).rowCount;
    console.log(`rowsAfected:\n${JSON.stringify(rowsAffected, null, 2)}\n`);

    if (rowsAffected)
      res.status(201).end();
    else
      res.status(500).send("We are not certain, but you probably don't own the resource."); // no db record was modified. possible reason is because the requester does not own the resource. db did not find any record that satisfies WHERE clause.
  } catch (error) {
    console.log(error.stack);
  }
}

module.exports = {
  insert,
  destroy,
  update
}

