console.log(`executing /db/index.js...\n`);
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
  query: (string, params) => pool.query(string, params)
}

// module.exports = {
//   query: (string, params) => poolQuery(string, params)
// }

// module.exports = {
//   query
// }

// function poolQuery(string, params) {
//   console.log('querying...');
//   console.log(`${string}\n${params}\n`);
//   pool.query(string, params);
// }

// module.exports = {
//   query: function (string, params) {
//     console.log(`pool:\n${JSON.stringify(pool)}`);
//     pool.query(string, params);
//   }
// }

// module.exports = {
//   query: function(text, params) {
//     console.log(`pool:\n${JSON.stringify(pool, null, 2)}`)
//     pool.query(text, params)
//   }
// }

/*

    load db connection configs into this scope

    create db connection pool

    define wrapper function for pg's query method

*/

