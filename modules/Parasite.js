var Creature = require('./Creature.js');

class Parasite extends Creature{

    constructor(x, y, id, matrix, objectMatrix, energy, target,mulEnergy){
        super(x, y, id, matrix, objectMatrix, energy, target,mulEnergy);
        this.moveEnergy = 2;
    }

    multiply() {
        let targetCells = this.chooseCells(0);
        let newCell = this.random(targetCells)

        if (this.energy >= this.mulEnergy && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            this.matrix[newY][newX] = this.id;
            let newParasite = new Parasite(newX, newY, this.id, this.matrix, this.objectMatrix, this.spawnEnergy, this.target,this.mulEnergy);
            this.objectMatrix[newY][newX] = newParasite;
            this.energy -= 2;
        }
    }


    eat() {
        let targetCells = this.chooseCells(this.target);
        let newCell = this.random(targetCells);

        if (this.energy > 0 && newCell) {
            let targetX = newCell[0];
            let targetY = newCell[1];

            this.objectMatrix[targetY][targetX].energy-=3;

            this.energy+=3;

            this.multiply();
        }else{
            this.move();
        }
        
    }

}

module.exports = Parasite;