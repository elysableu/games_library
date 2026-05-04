export class Piece {
    constructor(name, symbol, type, moves, interactions) {
        this.name = name;
        this.symbol = symbol;
        this.type = type;
        this.rules = {
            moves: moves,
            interactions: interactions
        };
        this.position = {
            x: 0, y: 0
        };
       
    }
}