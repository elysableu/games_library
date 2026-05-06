export class Board {
    constructor(dimensions, parameterPlacement = false) {
        this.dimensions = dimensions;
        this.parameterPlacement = parameterPlacement;
        this.spaces = null;

        this.build();
    }

    build() {
        throw new Error(`${this.constructor.name} must implement build()`);
    }

    reset() {

    }

    getSpace(x, y) {

    }

    moveToSpace(piece, destination) {

    }

    isValidPosition(x, y) {

    }

    getNeighbors(x, y) {

    }

    findPiece(piece) {

    }

    getOccupied() {

    }

    

}