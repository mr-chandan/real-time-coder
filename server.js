const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const actions = require('./src/Actions');
const io = new Server(server);

const userSocketMap = {};

function getallclienta(roomid) {
  return Array.from(io.sockets.adapter.room.get(roomid) || [].map((socketId) => {
    return {
      socketId,
      username: userSocketMap[socketId]
    }
  }));
}


io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on(actions.JOIN, ({ roomid, username }) => {

    userSocketMap[socket.id] = username;
    socket.join(roomid);
    const clients = getallclienta(roomid);

    clients.forEach(({ socketId }) => {
      io.to(socketId.emit(actions.JOINED, {
        clients,
        username,
        socketId: socket.id,
      }))
    })

  })
});

server.listen(5000, () => {
  console.log('listening on :5000');
});