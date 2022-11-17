var Creature = require('./Creature.js');

class Predator extends Creature{


    multiply() {
        let targetCells = this.chooseCells(0);
        let newCell = this.random(targetCells)

        if (this.energy >= 18 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            this.matrix[newY][newX] = this.id;
            let newPredator = new Predator(newX, newY, this.id, this.matrix, this.objectMatrix, this.spawnEnergy, this.target);
            this.objectMatrix[newY][newX] = newPredator;
            this.energy -= 6;
        }
    }
}

module.exports = Predator; 