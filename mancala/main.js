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
import { MancalaBoard } from './mancalaBoard.js';
import { BoardPlayer } from '#players/boardPlayer.js';
import { Piece } from '#game_parts/pieces/piece.js';

class Game {
    static totalStones = 48;

    constructor(computerOpponent) {
        this.board = new MancalaBoard();
        this.players = [];
        this.currentPlayer = null;
        this.computerOpponent = computerOpponent;
        this.humanPlayer = null;
        this.extraTurn = false;
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
        // Add players -> create generic player and have all others inherit from it
        this.players.push(new BoardPlayer(1)); // Enter player 1
        this.players.push(new BoardPlayer(2)); // Enter player 2

        if (this.computerOpponent) {
            this.humanPlayer = this.players[0]; // Player1 is always the human
        }

        // Randomly select first player
        this.currentPlayer = this.players[Math.floor(Math.random() * 2)];

        // Create 48 stones (pieces) and add 4 to each cup
        this.board.board.forEach((space) => {
            if (space.type !== 'cup') {
                return;
            }
            for (let i = 0; i < 4; i++) {
                space.addToSpace(new Piece('stone'));
            }
        });
    }

    playGame() {
        let resolved = false;

        // Take turns until game is resovled -> all cup type spaces are empty
        // do {
            this.takeTurn();

            if (this.isGameResolved()) {
                resolved = true;
            }

            // Switch current player at end of turn
             this.currentPlayer = this.currentPlayer.name === 'Player1' ? this.players[1] : this.players[0]; 
        // } while (!resolved);
    }
    
    async takeTurn() {
        // Display current board
        console.log('');
        console.log('Here\'s the current board: ');
        console.log('');
        this.board.display(this.currentPlayer.name === 'Player1' ? true : false);

        // Prompt user for turn
        console.log(`First up is ${this.currentPlayer.name}`);

        let moveFrom = null;
        
        // Junction between PVP and PVC
        if (this.computerOpponent) {
            if (this.currentPlayer === this.humanPlayer) {
                // Human take turn
                moveFrom = await this.humanTurn();
            } else {
                // Computer take turn
                moveFrom = await this.computerTurn();
            }
        } else {
            moveFrom = await this.humanTurn();
        }

        console.log(`Sowing ${moveFrom.count()} stones from cup #${moveFrom.index + 1}`);

        // this.sowStones(moveFrom);
    }

    async humanTurn() {
        const cupIndex = await number({
            message: 'Pick a cup to gather stones from ( 1 -> 6 )',
            min: 1,
            max: 6
        });

        return this.board.board[cupIndex - 1];
    }

    computerTurn() {
        console.log('Computer playing--------------');
        return Math.floor(Math.random() * 6);
    }

    sowStones(startSpace) {
        // Remove all pieces from starting space

        // Add into temp "hand"

        // Add one into the n following cups until temp is empty (SKIPPING the enemies store)

        // Check conditions of final cup
        // Are we capturing? 
    }

    // When landing in an empty cup the player captures the stones from the opposite side
    // and place in store
    // If nothing in opposite, capture nothing
    capture() {

    }

    landInStore(space) {
        if (space.type === 'store' && space.owner === this.currentPlayer.name) {
            this.toggleExtraTurn();
        }
    }

    toggleExtraTurn() {
        this.extraTurn === true ? false : true;
    }

    validMove() {

    }

    isGameResolved() {
        return false;
    }


}

Game.init();