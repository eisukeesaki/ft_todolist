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

