class GrassEater extends Creature{

    multiply() {
        let targetCells = this.chooseCells(0);
        let newCell = random(targetCells)

        if (this.energy >= 12 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            this.matrix[newY][newX] = this.id;
            let newGrassEater = new GrassEater(newX, newY, this.id, this.matrix, this.objectMatrix, this.energy, this.target);
            this.objectMatrix[newY][newX] = newGrassEater;
            this.energy -= 4;
        }
    }
}