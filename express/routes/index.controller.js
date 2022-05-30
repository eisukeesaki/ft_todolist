const db = require(__rootDir + '/db');

async function getAllTodos(req, res, next) {
  try {
    const queryStr = 'SELECT * FROM todos WHERE owner_id = $1';
    const queryParams = [req.session.uid];

    res.locals.todos = (await db.query(queryStr, queryParams)).rows;

    next();
  } catch (error) {
    console.log(error.stack);
  }
}

function renderIndex(req, res) {
  console.log(`res.locals.todos:\n${JSON.stringify(res.locals.todos, null, 2)}`);
  res.render('index');
}

module.exports = {
  getAllTodos,
  renderIndex
}

