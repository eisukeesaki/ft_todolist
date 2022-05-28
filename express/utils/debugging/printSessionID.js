function printSessionID(req, res, next) {
  console.log(`req.sessionID:\n${req.sessionID}\n`);
  next();
}

module.exports = printSessionID;

