const express = require("express");
const app = express();
const http = require("http").Server(app);

const io = require("socket.io")(http);

app.use(require('./routes/littlezoom.routes'));

app.use(express.static(__dirname + "/public"));

io.on("conection", (socket) => {
    socket.on("stream", (image) =>{
        socket.broadcast.emit("stream", image);
    });
});

module.exports = http;
