global.__rootDir = __dirname;

const express = require('./express');
const PORT = 4242; // TODO: read port from env vars

require('./db');

express.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});

global.stringifyJSON = require('json-stringify-safe'); // for debugging

/*

    init express instance

    start listening to requests

*/

