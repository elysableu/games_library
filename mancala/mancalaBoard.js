import { PerimeterBoard } from '#game_parts/boards/perimeterBoard.js';

export class MancalaBoard extends PerimeterBoard {
    static DEFAULT_MANCALA_DIMENSIONS = {x: 7, y: 2};

    static DEFAULT_MANCALA_CONFIG = [
        {name: 'cup1', type: 'cup', owner: 'Player1'},
        {name: 'cup2', type: 'cup', owner: 'Player1'},
        {name: 'cup3', type: 'cup', owner: 'Player1'},
        {name: 'cup4', type: 'cup', owner: 'Player1'},
        {name: 'cup5', type: 'cup', owner: 'Player1'},
        {name: 'cup6', type: 'cup', owner: 'Player1'},
        {name: 'store1', type: 'store', owner: 'Player1'},
        {name: 'cup7', type: 'cup', owner: 'Player2'},
        {name: 'cup8', type: 'cup', owner: 'Player2'},
        {name: 'cup9', type: 'cup', owner: 'Player2'},
        {name: 'cup10', type: 'cup', owner: 'Player2'},
        {name: 'cup11', type: 'cup', owner: 'Player2'},
        {name: 'cup12', type: 'cup', owner: 'Player2'},
        {name: 'store2', type: 'store', owner: 'Player2'}
    ];

    constructor(dimensions = MancalaBoard.DEFAULT_MANCALA_DIMENSIONS, config = MancalaBoard.DEFAULT_MANCALA_CONFIG, cyclical = true) {
        super(dimensions, config, cyclical);
        this.store1 = this.board[6];
        this.store2 = this.board[13];
    }

    display(p1Orientation = true) {
        const { x, y } = this.dimensions;

        const cups1 = this.board.slice(0, x - 1);
        const cups2 = this.board.slice(x, (2 * x) - 1);

        //TODO: Add labeling for cups 
        if (p1Orientation) {
            console.log(`                  ${[...cups2].reverse().map(space => `[ ${space.count()} ]` ).join(' ')}`);
            console.log(`Player2 -> [ ${this.store2.count()} ] ------------------------------------------ [ ${this.store1.count()} ] <- Player1`);
            console.log(`                   ${cups1.map(space =>  `[ ${space.count()} ]` ).join(' ')}`);
        } else {
            console.log(`                  ${[...cups1].reverse().map(space =>  `[ ${space.count()} ]` ).join(' ')}`);
            console.log(`Player1 -> [ ${this.store1.count()} ] ------------------------------------------ [ ${this.store2.count()} ] <- Player2`);
            console.log(`                  ${cups2.map(space =>  `[ ${space.count()} ]` ).join(' ')}`);
        }
    }

    playerCups(player) {
        return this.board.filter((space) => space.type === 'cup' && space.owner === player.name);
    }

    playerStore(player) {
        if (player.name === 'Player1') {
            return this.store1;
        } else {
            return this.store2;
        }
    }
    
    findOpposite(space) {
        const index = space.index;
        const length = this.board.length;
        const oppIndex = (length - 2) - index; 
        return this.board[oppIndex];
    }
}
