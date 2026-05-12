import { Board } from './board.js';
import { PerimeterSpace } from './spaces/perimeterSpace.js';

export class PerimeterBoard extends Board {
    constructor(dimensions, config, cyclical = false) {
        super(dimensions);
        this.config = config;
        this.cyclical = cyclical;

        this.build();
    }

    // ----------------- BUILD METHODS -----------------
    build() {
        // Create board with dimentions (array length)
       this.board = Array.from({ length: this.calculatePerimeter() }, (_, i) => 
            new PerimeterSpace(null, null, i)
        );

        this.configSpaces(this.config);
    }

    configSpaces(configDetails) {
        // Check that details.length is equal to the board.length (same as num of spaces)
        if (configDetails.length !== this.board.length) {
            throw new Error('Config length does not match the board length');
        }

        // Loop through details and assign each space with the same index the name and type
        configDetails.forEach((detail, i) => {
            console.log(detail);
            this.board[i].name = detail.name;
            this.board[i].type = detail.type;
        });
    }

    calculatePerimeter() {
        return (2 * this.dimensions.x) + (2 * this.dimensions.y) - 4;
    }

    // ----------------- GAMEPLAY METHDS -----------------
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

    isValidPosition(index) {
        return index >= 0 && index < this.board.length;
    }

    getSpace(index) {
       if (!this.isValidPosition(index)) throw new Error(`Invalid index: ${index}`);
        return this.board[index];
    }

    getNeighbors(index) {
        if (!this.isValidPosition(index)) throw new Error(`Invalid index: ${index}`);

        let neighbors = {
            next: null,
            previous: null
        };

        const previousIndex = this.cyclical ? (index - 1 + this.board.length) % this.board.length: index - 1;
        const nextIndex = this.cyclical ? (index + 1) % this.board.length : index + 1;

        if ( this.board[previousIndex]) {
            neighbors.previous = this.board[previousIndex];
        }

        if ( this.board[nextIndex]) {
            neighbors.next = this.board[nextIndex];
        }

        return neighbors;
    }
  
    getOccupied() {
        return this.board.filter(space => !space.isEmpty());
    }

    findPiece(piece) {
        return this.board.filter(space => !space.pieces.includes(piece))
    }
}
