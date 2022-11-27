var Creature = require('./Creature.js');

class Grass extends Creature{

    multiply(){
        this.energy++;
        let targetCells = this.chooseCells(0);
        let newCell = this.random(targetCells)

        if(this.energy >= this.mulEnergy && newCell){
            let newX = newCell[0];
            let newY = newCell[1];

            this.matrix[newY][newX] = this.id;
            let newGrass = new Grass(newX,newY,this.id,this.matrix,this.objectMatrix,this.spawnEnergy,this.target, this.mulEnergy);
            this.objectMatrix[newY][newX]=newGrass;
            this.energy = 0;
        }
    }

    update(){
        this.multiply();
    }

    

}

module.exports = Grass;