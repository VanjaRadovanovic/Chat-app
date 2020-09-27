const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app); 
const io = socketio(server);
const cors = require('cors');
app.use(cors());

const rooms = [];

io.on('connection', (socket) => {
    console.log('User has connected!');
    socket.on('join-room', ({name, room}) => {
      socket.join(room);
      let data;
      let prevMessagesIndex = rooms.findIndex((val) => val.roomName == room);
        
      if(prevMessagesIndex == -1){
        rooms.push({roomName: room, messages: []});
        prevMessagesIndex = rooms.length - 1;
      }else{
        data = rooms[prevMessagesIndex].messages;
        rooms[prevMessagesIndex].messages.push({name: 'admin', message: `${name} has joined ${room}`});
        socket.broadcast.to(room).emit('user-joined-message', rooms[prevMessagesIndex].messages);
        socket.emit('prev-messages', data);
      }

    socket.to(room).on('new-message', (data) => {
        if(!data.message){
            return;
        }
        rooms[prevMessagesIndex].messages.push(data);
        
        socket.broadcast.to(room).emit('new-messages', rooms[prevMessagesIndex].messages);
    });

    socket.to(room).on('disconnect', () => { 
        console.log('User has disconnected');
    })
    })   
});

server.listen(PORT, () => console.log('Server is listening' + PORT));
