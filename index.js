const express = require('express');
//initializes app to be a function handler for the HTTP server
const app = express();
const http = require('http');
const server = http.createServer(app);

//define home route
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

//server listens on port 3000
server.listen(3000, () => {
  console.log('listening on *:3000');
});