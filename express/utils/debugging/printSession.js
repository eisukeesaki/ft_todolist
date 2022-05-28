function printSessions(req, res, next) {
  console.log(`req.session:\n${JSON.stringify(req.session, null, 2)}\n`);
  next();
}

module.exports = printSessions;

