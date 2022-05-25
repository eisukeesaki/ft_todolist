const { on } = require('events');
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

async function testQuery(pool) {
  const client = await pool.connect();
  try{
    const res = await pool.query('SELECT NOW()');
    if (res.rows.length) console.log('test query successful');
  }
  finally {
    client.release();
  }
}

testQuery(pool).catch(err => console.log(err.stack));

