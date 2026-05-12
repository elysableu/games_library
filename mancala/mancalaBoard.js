import { PerimeterBoard } from '#game_parts/boards/perimeterBoard.js';

export class MancalaBoard extends PerimeterBoard {
    static DEFAULT_MANCALA_DIMENSIONS = {x: 7, y: 2};

    static DEFAULT_MANCALA_CONFIG = [
        {name: 'store1', type: 'store'},
        {name: 'cup1', type: 'cup'},
        {name: 'cup2', type: 'cup'},
        {name: 'cup3', type: 'cup'},
        {name: 'cup4', type: 'cup'},
        {name: 'cup5', type: 'cup'},
        {name: 'cup6', type: 'cup'},
        {name: 'store2', type: 'store'},
        {name: 'cup7', type: 'cup'},
        {name: 'cup8', type: 'cup'},
        {name: 'cup9', type: 'cup'},
        {name: 'cup10', type: 'cup'},
        {name: 'cup11', type: 'cup'},
        {name: 'cup12', type: 'cup'}
    ];

    constructor(dimensions = MancalaBoard.DEFAULT_MANCALA_DIMENSIONS, config = MancalaBoard.DEFAULT_MANCALA_CONFIG, cyclical = true) {
        super(dimensions, config, cyclical);
        this.store1 = this.board[0];
        this.store2 = this.board[7];
    }

    display() {
        const { x, y } = this.dimensions;

        const cups1 = this.board.slice(1, x);
        const cups2 = this.board.slice(x + 1, (2 * x) );

        console.log(`           ${[...cups2].reverse().map(space => space.display()).join(' ')}`);
        console.log(`${this.store2.display()} ---------------------------------------------- ${this.store1.display()}`);
        console.log(`            ${cups1.map(space => space.display()).join(' ')}`);
    }

    findOpposite(index) {

    }
}

const manBoard = new MancalaBoard();
manBoard.display();
