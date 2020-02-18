const express = require('express');

const server = express();
server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use((req, res) => {
  res.status(404).json({ message: '404 page not found fail whale' });
});

server.use((err, req, res, next) => {
  res.status(500).json({ message: 'Sorry something went wrong' });
});

//custom middleware

function logger(req, res, next) {
  const { method, url, originalUrl, path } = req;
  const time = new Date();
  console.log(`${method} ${url} ${originalUrl + '/' + path} ${time}`);
  next();
}

module.exports = server;
