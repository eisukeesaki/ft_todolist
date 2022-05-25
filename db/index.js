const { Client } = require('pg');
require('dotenv').config();

const config = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPWD,
  database: process.env.PGDB,
  port: process.env.PORT
}

async function connect(config) {
  try {
    const client = new Client(config);
    await client.connect();
    console.log('connected to database');
    return client;
  }
  catch (error) {
    console.log('failed to connect to database');
    console.log(error.message);
    process.exit(1);
  }
}

async function testConnection(client) {
  try {
    const res = await client.query('SELECT NOW()');
    console.log(`res.rows:${stringifyJSON(res.rows, null, 2)}`);
    await client.end();
  }
  catch (error) {
    console.log('failed to query database');
    console.log(error.message);
  }
}

async function testINSERTusers(client) {
  try {

    console.log('attempting to insert into users...');
    const res = await client.query("INSERT INTO users VALUES ('misato@nerv.jp', 'letmein')");
    // issue: insertion succeeds, but posgresql backend fails to respond to node-postgres?
    // Postgres logs
    // 2022-05-24 19:55:10.270 PDT [48131] LOG:  could not send data to client: Broken pipe
    // 2022-05-24 19:55:10.270 PDT [48131] FATAL:  connection to client lost
    await client.end();
    console.log('exiting try block');
  }
  catch (error) {
    console.log('failed to insert into users');
    console.log(error);
  }
}

async function connectDB(config) {
  const client = await connect(config);
  testConnection(client);
  // testINSERTusers(client);
}

connectDB(config);

