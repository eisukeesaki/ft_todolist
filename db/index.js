const { Pool } = require('pg');
require('dotenv').config();

const config = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPWD,
  database: process.env.PGDB,
  port: process.env.PORT
}

const pool = new Pool(config);

module.exports = {
  query: (text, params) => pool.query(text, params)
}

/*

    load db connection configs into this scope

    create db connection pool

    define wrapper function for pg's query method

*/

