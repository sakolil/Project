//Server's code
var Functions = require('./modules/Functions.js');
var functions = new Functions(20);
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');
app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);

//Game's code

io.on('connection', function (socket) {
    socket.on('Pause',changeStatus);
    socket.on('Start',changeStatus);
    socket.on('Restart',changeStatus);
    socket.on("bomb",bomb);
    
});

let gameStatus = 'paused';
const seasons = ['spring','summer','fall','winter'];
var creatureNames = ["Grass","Grasseater","Predator","Parasite","Robot"];
let jsonFileName = "stats.JSON";
let season = seasons[0];
let timer = 1;

function theGame(){
    io.sockets.emit("matrix",functions.matrix)
    io.sockets.emit("season",season);
    let creaturtes = getCreatureCount();
    io.sockets.emit("stats",creaturtes);

    if(gameStatus === 'active'){
        Activate();
        changeSeason();
        timer++;
    }
    else if(gameStatus === 'paused'){

    }
    else if(gameStatus === 'restart'){
        Restart(functions.matrix.length);

    }
    
}

function bomb(mouse){
    let coords = [
        [mouse[0],mouse[1]],
        [mouse[0] - 1, mouse[1] - 1],
        [mouse[0], mouse[1] - 1],
        [mouse[0] + 1, mouse[1] - 1],
        [mouse[0] - 1, mouse[1]],
        [mouse[0] + 1, mouse[1]],
        [mouse[0] - 1, mouse[1] + 1],
        [mouse[0], mouse[1] + 1],
        [mouse[0] + 1, mouse[1] + 1]
    ];
    for(let i = 0; i < coords.length;i++){
        functions.objectMatrix[coords[i][1]][coords[i][0]] = null;
        functions.matrix[coords[i][1]][coords[i][0]] = 0;
    }

}

function Activate(){
    for(let y =0;y<functions.objectMatrix.length;y++){
        for(let x = 0;x<functions.objectMatrix[y].length;x++){
            const object = functions.objectMatrix[y][x]; 
            if(object){
                object.update();
                object.season = season;
            }
        }
    }
}

function Restart(length){
    functions.matrix = functions.createMatrix(length);
    functions.objectMatrix = functions.createObjectsMatrix(functions.matrix);
    gameStatus = 'paused';
    season = seasons[0];
    timer = 1;
}

function getCreatureCount(){
    let creaturesCounts = [0,0,0,0,0];
    for(let y =0;y<functions.matrix.length;y++){
        for(let x = 0;x<functions.matrix[y].length;x++){
            if(functions.matrix[y][x] == 1){
                creaturesCounts[0] ++;
            }
            else if(functions.matrix[y][x] == 2){
                creaturesCounts[1] ++;
            }
            else if(functions.matrix[y][x] == 3){
                creaturesCounts[2] ++;
            }
            else if(functions.matrix[y][x] == 4){
                creaturesCounts[3] ++;
            }
            else if(functions.matrix[y][x] == 5){
                creaturesCounts[4] ++;
            }
        }
    }
    return creaturesCounts;
}

function printInJSONFile(){
    let count = getCreatureCount();
    let info = [];
    for( let i =0; i< count.length; i++){
        info.push({"Class":creatureNames[i], "Count":count[i]});
    }
    info = JSON.stringify(info);
    fs.writeFileSync(jsonFileName,info);
}

function changeStatus(val){
    gameStatus = val;
    val == "paused" ? printInJSONFile() : console.log();
    console.log(gameStatus);
}

function changeSeason(){
    if(timer%30 == 0){
        if(seasons.indexOf(season) == (seasons.length-1) ){
            season = seasons[0];
            timer = 1;

        }else{
            season = seasons[seasons.indexOf(season)+1];
            timer = 1;

        }
        alterStatsForSeason();
    }
}

function alterStatsForSeason(){
    for(let y =0;y<functions.objectMatrix.length;y++){
        for(let x = 0;x<functions.objectMatrix[y].length;x++){
            const object = functions.objectMatrix[y][x]; 
            if(object){
                if(object.id == 1){
                    grassChanger(object);
                }
                else if(object.id == 2){
                    grassEaterChanger(object);
                }
                else if(object.id == 3){
                    predatorChanger(object);
                }
                else if(object.id == 4){
                    parasiteChanger(object);
                }    
            }
        }
    }
}

function grassChanger(object){
    if(season == seasons[0] || season == seasons[2]){
        object.mulEnergy = 8;
    }
    else if(season == seasons[1]){
        object.mulEnergy = 4;
    }
    else if(season == seasons[3]){
        object.mulEnergy = 12;
    } 
}

function grassEaterChanger(object){
    if(season == seasons[0] || season == seasons[2]){
        object.mulEnergy = 25;
    }
    else if(season == seasons[1]){
        object.mulEnergy = 20;
    }
    else if(season == seasons[3]){
        object.mulEnergy = 28;
        object.moveEnergy = 1.5;
    } 
}

function predatorChanger(object){
    if(season == seasons[0] || season == seasons[2]){
        object.mulEnergy = 30;
    }
    else if(season == seasons[1]){
        object.mulEnergy = 34;
        object.moveEnergy = 1.5;
    }
    else if(season == seasons[3]){
        object.mulEnergy = 25;
    } 
}

function parasiteChanger(object){
    if(season == seasons[0] || season == seasons[2]){
        object.mulEnergy = 23;
    }
    else if(season == seasons[1]){
        object.mulEnergy = 21;
    }
    else if(season == seasons[3]){
        object.mulEnergy = 25;
        object.moveEnergy = 2.5;
    } 
}

let interval = 1000//ms;
printInJSONFile();
setInterval(theGame,interval);
setInterval(printInJSONFile,interval*60);