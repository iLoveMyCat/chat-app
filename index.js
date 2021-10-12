const path = require('path');
const express = require('express');
//initializes app to be a function handler for the HTTP server
const app = express();
const http = require('http');
const server = http.createServer(app);
//set static folder
app.use(express.static(path.join(__dirname, 'public')))
//use port 3000 if not env.port
const PORT = 3000 || process.env.PORT;
//initialize a new instance of socket.io by passing the server (the HTTP server) object. 
const { Server } = require("socket.io");
const io = new Server(server);

//user count increased and decreased on connect and disconnect
var clients = 0;


//      set static folder instead
// // define home route
// app.get('/', (req, res) => {
//   res.sendFile('/index.html');
// });

//listen on the connection event
io.on('connection', (socket) => {
    //log user count and connection message
    clients ++;
    socket.broadcast.emit('chat message','a user from:' + socket.request.socket.remoteAddress +', connected at ' + socket.handshake.time);
    socket.broadcast.emit('chat message',`current other users count: ${clients-1}`);
    if(clients == 2){
      socket.emit('chat message', `Welcome! There is currently ${clients-1} other user in this chat`);
    }
    else{
      socket.emit('chat message', `Welcome! There are currently ${clients-1} other users in this chat`);
    }

    
    //socket disconnects
    socket.on('disconnect', () => {
      socket.broadcast.emit('chat message','a user with an adress:' + socket.request.socket.remoteAddress +', disconnected at ' + socket.handshake.time);
      clients--;
      socket.broadcast.emit('chat message',`other user count in the chat: ${clients-1}`)
    });
    
    
    //listen on 'chat message'
    socket.on('chat message', (msg) => {
      //send the message to all connected sockets
      io.emit('chat message', msg);
    });
});



//server listens on port 3000
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});