//--------------------------------------------------- debugging
global.stringifyJSON = require('json-stringify-safe');
//--------------------------------------------------- /debugging

const app = require('./express/app');
const PORT = 4242; // TODO: read port from env vars

require('./db');

app.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});

