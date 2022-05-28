const db = require(__rootDir + '/db');

async function authenticate(req, res, next) {
  const queryStr = 'SELECT password from users where email = $1';
  const queryParams = [req.body.email];
  const pwd = (await db.query(queryStr, queryParams)).rows[0].password;

  if (req.body.password == pwd) {
    next();
  } else {
      res.redirect(401, '/');
    }
}

function createSession(req, res) {
  req.session.regenerate((err) => {
    if (err) next(err);

    req.session.user = req.body.email; // <req.sessionID is automatically generated and stored>
    req.session.save((err) => {
      if (err) next(err);

      console.log(`req.session.user:${JSON.stringify(req.session.user)}`);
      console.log(`req.sessionID:${req.sessionID}`);
      res.redirect(200, '/');
    });
  });
}

function isAuthenticated(req, res, next) {
  if (req.session.user) next();
  else {
    res.redirect(401, '/');
  }
}

module.exports = {
  authenticate,
  isAuthenticated,
  createSession
}

