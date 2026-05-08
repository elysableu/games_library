import { Space } from './spaces/space.js';

export class Board {
    constructor(dimensions, filled = true) {
        this.dimensions = dimensions;
        this.board = null;
    }

    reset() {
        this.board = null;
        this.build();
    }
}
