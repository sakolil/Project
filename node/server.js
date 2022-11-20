var Functions = require('../classes/Functions.js');
var functions = new Functions();
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);


const matrix = functions.createMatrix(50,50);
const objectMatrix = functions.createObjectsMatrix(matrix);


logIDs();
functions.updateObjectsMatrix(objectMatrix);
logIDs();



function logIDs(){
    for(let y =0;y<objectMatrix.length;y++){
        for(let x = 0;x<objectMatrix[y].length;x++){
            if(matrix[y][x]===1){
            console.log("Grass =>"+ objectMatrix[y][x].id);
               
            }
            else if(matrix[y][x]===2){
            console.log("GrassEater =>"+ objectMatrix[y][x].id);
                
            }
            else if(matrix[y][x]===3){
            console.log("Predator =>"+ objectMatrix[y][x].id);
                
            }
            else if(matrix[y][x]===4){
            console.log("Parasite =>"+ objectMatrix[y][x].id);
                
            }
            else if(matrix[y][x]===5){
            console.log("Robot =>"+ objectMatrix[y][x].id);
                
            }    
            else{
            console.log("Void => 0");
                
            }

        }
    }
    console.log("End");
}





io.on('connection', function (socket) {

    
    
    });