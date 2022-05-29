const db = require(__rootDir + '/db');

async function authenticate(req, res, next) {
  const queryStr = 'SELECT id, password from users where email = $1';
  const queryParams = [req.body.email];
  const record = (await db.query(queryStr, queryParams)).rows[0];
  const pwd = record.password;

  if (req.body.password == pwd) {
    res.locals.uid = record.id; // TODO: identify risks of exposing id to view engine
    next();
  } else {
      res.redirect(401, '/');
    }
}

function createSession(req, res) {
  req.session.regenerate((err) => {
    if (err) next(err);

    req.session.user = req.body.email; // <req.sessionID is automatically generated and stored>
    req.session.uid = res.locals.uid;
    req.session.save((err) => {
      if (err) next(err);

      res.redirect(200, '/');
    });
  });
}

function destroySession(req, res) {
  req.session.destroy((err) => {
    if (err) next(err);

    res.redirect(200, '/');
  });
}

function isAuthenticated(req, res, next) {
  if (req.session.user) next();
  else {
    res.status(401).render('login');
  }
}

module.exports = {
  authenticate,
  isAuthenticated,
  createSession,
  destroySession
}

