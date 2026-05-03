/*
    Mancala:
        Setup: 
            - 4 stones (pieces) are placed in each of the 12 small cups 
            - There are 6 small cups on either side of the board 
            - The large cup (store) to the player's right belongs to them, the other their opponent
        Gameplay: 
            - Players take turns picking up all stones from one of their six cups
            - Then distributes them, one by one, into the next cups going counterclockwise
            - SOWING: Players do drop a stone in their own store if they pass it; skip opponent's store
            - EXTRA TURN: If last stone in your hand lands in your own store, you go again.
            - CAPTURING: If the last stone alnds in an empty cup on your own side, you take that stone and 
            all stones in the opponent's cup directly opposite -> all placed in your store
                - If opposite cup is empty, nothing is captured.
        Game End:
            - Game ends when all six small cups on one side of the board are empty
            - SCORING: Any stones remaining on the player's size when the game ends are added to their store.
            - Player with the most stones in their store wins.
        Strategy:
            - GOING FIRST ADVANTAGE
            - START WITH THIRD CUP: lands last piece in store, allows for second turn
            - CHAIN TURNS: always look for moves that end in your store to keep up your momentum
*/

class Game {
    constructor() {

    }

    static async init() {

    }
}

Game.init();