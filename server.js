var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var app = express();

app.use(express.static(__dirname));
var server = app.listen(3000, () => {
    console.log('server is running on ', server.address().port);
});

io.on('connection', () => {
    console.log('A user is connected');
});