const express = require('express');
//initializes app to be a function handler for the HTTP server
const app = express();
const http = require('http');
const server = http.createServer(app);
//initialize a new instance of socket.io by passing the server (the HTTP server) object. 
const { Server } = require("socket.io");
const io = new Server(server);

//define home route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//listen on the connection event for incoming sockets and log it to the console.
io.on('connection', (socket) => {
    console.log('a user from:' + socket.request.socket.remoteAddress +', connected at ' + socket.handshake.time);
    socket.on('disconnect', () => {
        console.log('a user from:' + socket.request.socket.remoteAddress +', disconnected at ' + socket.handshake.time);
    });
});


io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
      //send the message to all connected sockets
      io.emit('chat message', msg);
    });
});

//server listens on port 3000
server.listen(3000, () => {
  console.log('listening on *:3000');
});