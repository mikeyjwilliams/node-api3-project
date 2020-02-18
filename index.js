// code away!
const port = 5000;
const host = 'localhost';
const server = require('./server');

server.listen(port, host, () => {
  console.log(`\n *** ${host}:${port} *** \n`);
});
