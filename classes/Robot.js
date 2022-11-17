var Creature = require('./Creature.js');

class Robot extends Creature{

    constructor(x, y, id, matrix, objectMatrix, energy) {
        super(x, y, id, matrix, objectMatrix, energy);
        this.updateExplosionCoordinates();
    }

    updateExplosionCoordinates() {
    this.explosionDirections = [
        [this.x - 1, this.y - 1],
        [this.x, this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y],
        [this.x + 1, this.y],
        [this.x - 1, this.y + 1],
        [this.x, this.y + 1],
        [this.x + 1, this.y + 1],
        [this.x, this.y-2],
        [this.x-1, this.y-2],
        [this.x-2, this.y-2],
        [this.x+1, this.y-2],
        [this.x+2, this.y-2],
        [this.x-2, this.y - 1],
        [this.x+2, this.y - 1],
        [this.x - 2, this.y],
        [this.x +2, this.y],
        [this.x+2, this.y + 1],
        [this.x-2, this.y + 1],
        [this.x, this.y+2],
        [this.x-1, this.y+2],
        [this.x-2, this.y+2],
        [this.x+1, this.y+2],
        [this.x+2, this.y+2]
        
    ];
    }

    chooseExplosionCoordinates(){
        this.updateExplosionCoordinates();
        let found = [];
        for (let i = 0; i < this.explosionDirections.length; i++) {
            let coordinates = this.explosionDirections[i];
            let x = coordinates[0];
            let y = coordinates[1];
            if (x >= 0 && x < this.matrix[0].length && y >= 0 && y < this.matrix.length) {
                found.push(this.explosionDirections[i]);
            }
        }
        return found;    
    }

    explode() {
        if (this.energy % 10 == 0) { 
            let cells = this.chooseExplosionCoordinates();      
            for(let y = 0;y<cells.length;y++){
                let coordinates = cells[y];
                let targetX = coordinates[0];
                let targetY = coordinates[1];
                this.matrix[targetY][targetX] = 0;
                this.objectMatrix[targetY][targetX] = null;
            }
        }
    }

    eat() {
        let firstTargets = this.chooseCells(2);
        let secondTargets = this.chooseCells(3);
        let thirdTargets = this.chooseCells(4);
        let fourthTargets = this.chooseCells(1);
        let targets = fourthTargets.concat(thirdTargets.concat(secondTargets.concat(firstTargets)));
        let newCell = this.random(targets);

        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            this.matrix[this.y][this.x] = 0;
            this.matrix[newY][newX] = this.id;

            this.objectMatrix[newY][newX] = this;
            this.objectMatrix[this.y][this.x] = null;

            this.x = newX;
            this.y = newY;

            this.energy++;

            this.explode();
        }else{
            this.move();
        }
        
    }

    move() {
        let targetCells = this.chooseCells(0);
        let newCell = this.random(targetCells);

        if (this.energy > 0 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            this.matrix[this.y][this.x] = 0;
            this.matrix[newY][newX] = this.id;

            this.objectMatrix[newY][newX] = this;
            this.objectMatrix[this.y][this.x] = null;

            this.x = newX;
            this.y = newY;

        }
        this.die();
    }
    
    die() {
        if (this.energy >= 60) {
            this.matrix[this.y][this.x] = 0;
            this.objectMatrix[this.y][this.x] = null;
            this.explode();
        }
    }

}

module.exports = Robot;