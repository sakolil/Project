p5.disableFriendlyErrors = true 
var socket = io();
var start = document.getElementById("start");
var paused = document.getElementById("pause");
var restart = document.getElementById("restart");
var seasonText = document.getElementById("season");
var stats = document.getElementById("stats");
var creatureNames = ["Grass","Grasseater","Predator","Parasite","Robot"];
let season = 'spring';
let grasscolor = 'green';
let matrixLength = 20;
let squareSide = 10;
let mouseCoords;

start.onclick = function(){socket.emit('Start','active');};
paused.onclick = function(){socket.emit('Pause','paused');};
restart.onclick = function(){socket.emit('Restart','restart');};
window.onclick = explode;

// document.onclick = console.log(mouseX + " " + mouseY);

function setup(){
    createCanvas(matrixLength*squareSide,matrixLength*squareSide);
    background("gray");
    frameRate(60);
}

function draw(){
    socket.on("matrix",drawMatrix);
    socket.on("stats",displayStats);
    socket.on("season",changeseason);
    seasonText.innerText = "The current season is " + season;
    mouseCoords = [mouseX,mouseY];
}

function explode(){
    let matrixCoords = [Math.floor(mouseCoords[0]/squareSide),Math.floor(mouseCoords[1]/squareSide)];
    if( matrixCoords[0] < matrixLength && matrixCoords[0]>=0 && matrixCoords[1] < matrixLength && matrixCoords[1]>=0 ){
        socket.emit("bomb",matrixCoords);
    }
}

function displayStats(creatures){
    let text = ""
    for(let i = 0; i<creatures.length;i++){
        text += creatureNames[i] + ": " + creatures[i] + "\n";
    }
    stats.innerText = text;
}




function drawMatrix(matrix){
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
            rect(x*squareSide,y*squareSide,squareSide,squareSide);
        }
    }
}

function changeseason(val){
    season = val;
}