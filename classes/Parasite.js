class Parasite extends Creature{

    multiply() {
        let targetCells = this.chooseCells(3);
        let newCell = random(targetCells)

        if (this.energy >= 7 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            this.matrix[newY][newX] = this.id;
            let newParasite = new Parasite(newX, newY, this.id, this.matrix, this.objectMatrix, this.spawnEnergy, this.target);
            this.objectMatrix[newY][newX] = newParasite;
            this.energy -= 2;
        }
    }


    eat() {
        let targetCells = this.chooseCells(this.target);
        let newCell = random(targetCells);

        if (this.energy > 0 && newCell) {
            let targetX = newCell[0];
            let targetY = newCell[1];

            this.objectMatrix[targetY][targetX].energy-=3;

            this.energy+=2;

            this.multiply();
        }else{
            this.move();
        }
        
    }

}