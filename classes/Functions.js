var Grass = require('../classes/Grass.js');
var GrassEater = require('../classes/GrassEater.js');
var Predator = require('../classes/Predator.js');
var Parasite = require('../classes/Parasite.js');
var Robot = require('../classes/Robot.js');

module.exports = class functions{

    constructor(matrixSide){
        this.matrix = this.createMatrix(matrixSide);
        this.objectMatrix = this.createObjectsMatrix(this.matrix);
        this.gameStatus = 'active';
    }

    createObjectsMatrix(matrix){
        const newObjectsMatrix = []
        for(let y = 0;y<matrix.length;y++){
            newObjectsMatrix[y]=[];
            for(let x = 0;x<matrix[y].length;x++){
                if(matrix[y][x]===1){
                    const newGrass = new Grass(x,y,1,matrix,newObjectsMatrix,0,0);
                    newObjectsMatrix[y][x] = newGrass;
                }
                else if(matrix[y][x]===2){
                    const newGrassEater = new GrassEater(x,y,2,matrix,newObjectsMatrix,10,1);
                    newObjectsMatrix[y][x] = newGrassEater;
                }
                else if(matrix[y][x]===3){
                    const newPredator = new Predator(x,y,3,matrix,newObjectsMatrix,12,2);
                    newObjectsMatrix[y][x] = newPredator;
                }
                else if(matrix[y][x]===4){
                    const newParasite = new Parasite(x,y,4,matrix,newObjectsMatrix,5,3);
                    newObjectsMatrix[y][x] = newParasite;
                }
                else if(matrix[y][x]===5){
                    const newRobot = new Robot(x,y,5,matrix,newObjectsMatrix,11);
                    newObjectsMatrix[y][x] = newRobot;
                }    
                else{
                    newObjectsMatrix[y][x]=null;
                }
    
            }
        }
        return newObjectsMatrix;
    }


    createMatrix(matrixLength) {
        let newMatrix = [];
        for (let y = 0; y < matrixLength; y++) {
            newMatrix[y] = [];
            for (let x = 0; x < matrixLength; x++) {
                const randomSectionCursor = Math.random()*100;
                if (randomSectionCursor < 45) {
                    newMatrix[y][x] = 1;
                }
                else if (randomSectionCursor < 70) {
                    newMatrix[y][x] = 2;
                }
                else if (randomSectionCursor < 85) {
                    newMatrix[y][x] = 3;
                }
                else if (randomSectionCursor < 87.5) {
                    newMatrix[y][x] = 4;
                }
                else if (randomSectionCursor > 99.7) {
                    newMatrix[y][x] = 5;
                }
                else {
                    newMatrix[y][x] = 0
                }
            }
        }
        return newMatrix;
    }
//Relocate theGame func to server.js
    theGame(){
        this.gameStatus = 'restart';
        console.log(this.gameStatus);
        if(this.gameStatus === 'active'){
            this.Activate();
            console.log("act");
        }
        else if(this.gameStatus === 'paused'){

        }
        else if(this.gameStatus === 'restart'){
            this.Restart(this.matrix.length);

        }
        
    }

    Activate(){
        for(let y =0;y<this.objectMatrix.length;y++){
            for(let x = 0;x<this.objectMatrix[y].length;x++){
                const object = this.objectMatrix[y][x]; 
                if(object){
                    object.update();
                }
            }
        }
    }

    Restart(length){
        this.matrix = this.createMatrix(length);
        this.objectMatrix = this.createObjectsMatrix(this.matrix);
        this.gameStatus = 'paused';
    }


}