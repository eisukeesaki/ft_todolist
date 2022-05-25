async function selectNow(pool) {
  const client = await pool.connect();
  try{
    const res = await pool.query('SELECT NOW()');
    if (res.rows.length) console.log('test query successful');
  }
  finally {
    client.release();
  }
}

module.exports = {
  selectNow
}

/*

copy following snippet into /db/index.js to quickly run a query test
    const { selectNow } = require('./tests');
    selectNow(pool).catch(err => console.log(err.stack));

*/

