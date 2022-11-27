var socket = io();
var start = document.getElementById("start");
var pause = document.getElementById("pause");
var restart = document.getElementById("restart");
var seasonText = document.getElementById("season");
var grass = document.getElementById("grass");
var grassEater = document.getElementById("grassEater");
var predator = document.getElementById("predator");
var parasite = document.getElementById("parasite");
var robot = document.getElementById("robot");
let season = 'spring';
let grasscolor = 'green';

start.onclick = function(){socket.emit('Start','active');};
pause.onclick = function(){socket.emit('Pause','paused');};
restart.onclick = function(){socket.emit('Restart','restart');};
// document.onclick = console.log(mouseX + " " + mouseY);

function setup(){
    createCanvas(500,500);
    background("gray");
    frameRate(30);
}

function draw(){
    socket.on("matrix",drawMatrix);
    socket.on("season",changeseason);
    seasonText.innerText = "The current season is " + season;
    console.log(mouseX + " " + mouseY);

}

// function displayStat(creature){
//     creature.innerText = creature.id + ": " + 
// }
function getCreatureCount(){
    socket.on("stats")
}

function drawMatrix(matrix){
    let side = 50;
    if(season == 'spring'){
        grasscolor = "green";
    }
    else if(season == 'summer'){
        grasscolor = "#9FFF33";
    }
    else if(season == 'fall'){
        grasscolor = "#FFE333";
    }
    else{
        grasscolor = "#D3FEF3";
    }

    for(let y  = 0;y<matrix.length;y++){
        for (let x = 0;x<matrix[0].length;x++){
            if(matrix[y][x]===1){
                fill(grasscolor);
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

function changeseason(val){
    season = val;
}