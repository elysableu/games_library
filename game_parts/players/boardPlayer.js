export class BoardPlayer {
    constructor(num) {
        this.name = `Player${num}`;
        this.pieces = [];
        this.score = 0;
    }

    pickUpPiece(piece) {
        this.pieces.push(piece);
    }

    placePiece(piece) {
        const index = this.pieces.indexOf(piece);
        this.pieces.splice(index, 1);
    }

    updateScore(update) {
        this.score += update;
    }
}