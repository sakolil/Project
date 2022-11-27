var Creature = require('./Creature.js');

class GrassEater extends Creature{

    multiply() {
        let targetCells = this.chooseCells(1);
        let newCell = this.random(targetCells)
        let potentialPartner = this.random(this.chooseCells(this.id));

        if(potentialPartner){
            if (this.energy >= this.mulEnergy && newCell && !potentialPartner.gender) {
                let newX = newCell[0];
                let newY = newCell[1];
    
                this.matrix[newY][newX] = this.id;
                let newGrassEater = new GrassEater(newX, newY, this.id, this.matrix, this.objectMatrix, this.spawnEnergy, this.target, this.mulEnergy);
                this.objectMatrix[newY][newX] = newGrassEater;
                this.energy -= 10;
            }
            else{
                this.move();
            }
        }
       
        else{
            this.move();
        }
    }
}


module.exports = GrassEater;