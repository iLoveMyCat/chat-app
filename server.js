const path = require('path');
const express = require('express');
//initializes app to be a function handler for the HTTP server
const app = express();
const http = require('http');
const server = http.createServer(app);
//set static folder
app.use(express.static(path.join(__dirname, 'public')))
//use port 3000 if no env.port
const PORT = process.env.PORT || 3000;
//initialize a new instance of socket.io by passing the server (the HTTP server) object. 
const { Server } = require("socket.io");
const io = new Server(server);
const formatMessage = require('./utils/messages');
const BOT_NAME = "Chat bot";
const {userJoin, getCurrentUser, getAllUsers, userLeft} = require("./utils/users");

//listen on the connection event
io.on('connection', (socket) => {
    socket.on('join server', ({username, color}) => {
      const user = userJoin(socket.id, username, color);

      socket.emit('chat message', formatMessage(BOT_NAME,`Welcome ${user.username}!`));
      socket.broadcast.emit('chat message', formatMessage(BOT_NAME, `${user.username} just joined the chat.`));
 

      //socket disconnects
      socket.on('disconnect', () => {
        userLeft(socket.id);
        socket.broadcast.emit('chat message',formatMessage(BOT_NAME,`${user.username} left the chat.`));
        //send users
        io.emit('room users', {
          users: getAllUsers()
        });
      });
      
      //listen on 'chat message'
      socket.on('chat message', (msg) => {
        //send the message to all connected sockets
        io.emit('chat message', formatMessage(`${user.username}`,msg));
      });

      //send users
      io.emit('room users', {
        users: getAllUsers()
      });
    });
});

//server listens on port 3000
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});