global.__rootDir = __dirname;
global.__toString = require('json-stringify-safe');

const express = require('./express');
const PORT = 4242; // TODO: read port from env vars

require('./db');

express.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}\n`);
});

global.stringifyJSON = require('json-stringify-safe'); // debug

/*

    init express instance

    create database connection pool

    start listening to requests

*/

