var express = require('express');
var wsio = require('websocket.io');

var app = express.createServer();
var ws = wsio.attach(app);

app.use(express.static('public'));
ws.on('connection', function (socket) {
    socket.on('message', function (msg) {
        console.log(msg);
        socket.send('pong');
    });
});

app.listen(4300);