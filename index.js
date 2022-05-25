const app = require('./express/app');
const PORT = 4242; // TODO: read port from env vars

app.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});

