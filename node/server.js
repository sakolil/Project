var Functions = require('../classes/Functions.js');
var functions = new Functions(10);
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);

io.on('connection', function (socket) {
    socket.on('Pause',changeStatus);
    socket.on('Start',changeStatus);
    socket.on('Restart',changeStatus);
    
});

let gameStatus = 'active';

function theGame(){
    io.sockets.emit("matrix",functions.matrix)
    console.log(gameStatus)
    if(gameStatus === 'active'){
        Activate();
        console.log("act");
    }
    else if(gameStatus === 'paused'){

    }
    else if(gameStatus === 'restart'){
        Restart(functions.matrix.length);

    }
    
}

function Activate(){
    for(let y =0;y<functions.objectMatrix.length;y++){
        for(let x = 0;x<functions.objectMatrix[y].length;x++){
            const object = functions.objectMatrix[y][x]; 
            if(object){
                object.update();
            }
        }
    }
}

function Restart(length){
    functions.matrix = functions.createMatrix(length);
    functions.objectMatrix = functions.createObjectsMatrix(functions.matrix);
    gameStatus = 'paused';
}

function changeStatus(val){
    gameStatus = val;
    console.log(gameStatus);
}

setInterval(theGame,500);