import { Board } from './board.js';
import { Space } from './spaces/space.js';


export class PerimeterBoard extends Board {
    constructor() {
        this.build();
    }

    build() {
       this.board = Array.from({ length: this.calculatePerimeter() }, () => {
            new Space()
        });
    }

    getSpace(x, y) {

    }

    isValidPosition(x, y) {

    }

    getNeighbors(x, y) {

    }

    display() {
        const { x, y } = this.dimensions;

        const top = this.board.slice(0, x);
        const right = this.board.slice(x,  x + y -2);
        const bottom = this.board.slice(x + (y - 2), (2 * x) + (y - 2));
        const left = this.board.slice((2 * x) + ( y - 2));

        console.log(top.map(space => `[ ]`).join(' '));
        for (let i = 0; i < left.length; i++) {
            console.log(`[ ] ${'    '.repeat(x - 2)}[ ]`);
        }
        console.log(bottom.map(space => `[ ]`).join(' '));
    }

    findPiece(piece) {

    }

    getOccupied() {

    }

    calculatePerimeter() {
        return (2 * this.dimensions.x) + (2 * this.dimensions.y) - 4;
    }
}