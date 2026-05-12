import { Board } from './board.js';
import { FilledSpace } from './spaces/filledSpace.js';

export class FilledBoard extends Board {
    constructor() {
        this.build();
    }

    build() {
        this.board = Array.from({ length: this.dimensions.y }, () => 
            Array.from({length: this.dimensions.x }, () => new Space())
        );
    }

    getSpace(x, y) {

    }

    isValidPosition(x, y) {

    }

    getNeighbors(x, y) {
        let neighbors = [];


    }

    display() {
        this.board.forEach(row => {
            console.log(row.map(space => `[ ]`).join(' '));
        })
    }

    findPiece(piece) {

    }

    getOccupied() {
        return this.board.flat().filter(space => !space.isEmpty());
    }
}