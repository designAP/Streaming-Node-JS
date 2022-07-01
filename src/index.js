const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var sizeof = require('object-sizeof');

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on("stream", (image) =>{
	  var frame = Buffer.from(image, 'base64').toString()
	  
    socket.broadcast.emit("stream", frame);
});
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});




