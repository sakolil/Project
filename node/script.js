var socket = io();
var start = document.getElementById("start");
var pause = document.getElementById("pause");
var restart = document.getElementById("restart");

start.onclick = function(){socket.emit('Start','active');};
pause.onclick = function(){socket.emit('Pause','paused');};
restart.onclick = function(){socket.emit('Restart','restart');};

function setup(){
    createCanvas(2500,2500);
    background("gray");
    frameRate(2);
}

function draw(){
    socket.on("matrix",drawMatrix);
}

function drawMatrix(matrix){
    let side = 50;
    for(let y  = 0;y<matrix.length;y++){
        for (let x = 0;x<matrix[0].length;x++){
            if(matrix[y][x]===1){
                fill("green");
            }
            else if(matrix[y][x]==2){
                fill("yellow");
            }
            else if(matrix[y][x]==3){
                fill("red");
            }
            else if(matrix[y][x]==4){
                fill("blue");
            }
            else if(matrix[y][x]==5){
                fill("orange");
            }
            else{
                fill("grey")
            }
            rect(x*side,y*side,side,side)
        }
    }
}