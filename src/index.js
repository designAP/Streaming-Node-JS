const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on("stream", (image) =>{
	  var ret = Object.assign({}, image, {
      frame: Buffer.from(data.frame, 'base64').toString() // from buffer to base64 string
    }) 
    socket.broadcast.emit("stream", ret);
});
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});




