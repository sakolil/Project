var Functions = require('../classes/Functions.js');
var functions = new Functions(10,'active');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('Project/index.html');
});

server.listen(3000);

io.on('connection', function (socket) {
    socket.on('Pause',function(){functions.gameStatus = 'paused'; console.log(functions.gameStatus)});
    socket.on('Start',function(){functions.gameStatus = 'active'; console.log(functions.gameStatus)});
    socket.on('Restart',function(){functions.gameStatus = 'restart'; console.log(functions.gameStatus)});
    socket.on('give matrix',function(){socket.emit("matrix",functions.matrix);});

});

setInterval(functions.theGame,100);