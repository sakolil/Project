var Creature = require('./Creature.js');

class GrassEater extends Creature{

    multiply() {
        let targetCells = this.chooseCells(1);
        let newCell = this.random(targetCells)

        if (this.energy >= 12 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            this.matrix[newY][newX] = this.id;
            let newGrassEater = new GrassEater(newX, newY, this.id, this.matrix, this.objectMatrix, this.spawnEnergy, this.target);
            this.objectMatrix[newY][newX] = newGrassEater;
            this.energy -= 4;
        }
    }
}


module.exports = GrassEater;