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

import { input, select, confirm, number } from '@inquirer/prompts';

class Game {
    static totalStones = 48;
    static boardDimensions = {w: 8, h: 2};

    constructor(computerOpponent) {
        this.board = new Board(boardDimensions);
        this.players = [];
        this.computerOpponent = computerOpponent;
        this.humanPlayer = null;
        this.resolved = false;

        this.build();
    }

    static async init() {
        let computerOpponentChoice = false;

        console.log('Let\'s play mancala!');
        if (await confirm({message: 'Ready?'})) {
            computerOpponentChoice = await select({
                message: 'Who are you playing against?',
                choices: [
                    { name: 'Human', value: false },
                    { name: 'Computer', value: true }
                ]
            });
        } 

        const game = new Game(computerOpponentChoice);
        game.playGame();
    }

    build() {
        // Assign each cup on board typing and/or rules
        // Assign store as one board location rather than two (or two with shared storage?)
        // Will consist of a slice of each of the boards nested array
        // player1: { smallCups: array[0][1...6], store: array[0][0]}
        // player2: { smallCups: array[1][1...6], store: array[1][7]}
        
        // Add players -> create generic player and have all others inherit from it
        // Assign players each a side and a store (side "closest" and store to the right)


        // Distribute the stones into the 12 smallCups -> 4 stone per cup
    }

    playGame() {

    }
}

Game.init();