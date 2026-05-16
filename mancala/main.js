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
            - CAPTURING: If the last stone lands in an empty cup on your own side, you take that stone and 
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
       this.addPlayers();
       this.addStonesToCups();
    }

    addPlayers() {
         // Add players -> create generic player and have all others inherit from it
        this.players.push(new BoardPlayer(1)); // Enter player 1
        this.players.push(new BoardPlayer(2)); // Enter player 2

        if (this.computerOpponent) {
            this.humanPlayer = this.players[0]; // Player1 is always the human
        }

        // Randomly select first player
        this.currentPlayer = this.players[Math.floor(Math.random() * 2)];
    }

    addStonesToCups() {
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

    async playGame() {
        // Take turns until game is resovled -> all cup type spaces are empty
        do {
            await this.takeTurn();
            console.log(`${this.currentPlayer.name} has finished their turn`);

            this.isGameResolved();

            // Switch current player at end of turn
            if (!this.extraTurn) {
                this.currentPlayer = this.currentPlayer.name === 'Player1' ? this.players[1] : this.players[0]; 
            }
        } while (!this.resolved);

        const winner = this.determineWinner();
        console.log('That\'s that game!');
        console.log(`${winner.name} is the winner!`);
    }
    
    async takeTurn() {
        if (this.extraTurn) {
            console.log(`${this.currentPlayer.name} has an extra turn!`);
            this.toggleExtraTurn(); // Toggle off if on, after starting an extra turn
        } else {
            console.log(`${this.currentPlayer.name} it\'s your turn!`);
        }
        
        // Display current board
        console.log('');
        console.log('Here\'s the current board: ');
        console.log('');
        this.board.display(this.currentPlayer.name === 'Player1' ? true : false);
        
        let moveFrom = null;

        do {
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

            if (moveFrom.count() === 0) {
                moveFrom = null;
                console.log('That cup has no stones to move!  Try again!');
            }
        } while (moveFrom === null); 
        
        this.sowStones(moveFrom);
        this.board.display(this.currentPlayer.name === 'Player1' ? true : false);
    }
    
    async humanTurn() {
        let cup = null;

        do {
           cup = await number({
                message: 'Pick a cup to gather stones from ( 1 -> 6 )',
                min: 1,
                max: 6
            })
        } while (!cup);

        const cupIndex =  this.currentPlayer.name === 'Player1' ? cup : cup + 7;

        return this.board.board[cupIndex - 1];
    }
    
    computerTurn() {
        console.log('Computer playing--------------');
        return Math.floor(Math.random() * 6);
    }
    
    sowStones(space) {
        // Add stones into "hand" temp variable
        let currentCup = space;
        let stones = currentCup.pieces;
        let landingCupCount = null;
        
        // Remove all pieces from starting space
        space.removeAllFromSpace();

        console.log(`Sowing ${stones.length} stones from cup #${currentCup.index % 6}`);

        // Add one into the n following cups until temp is empty (SKIPPING the enemies store)
        do {
            let nextCup = this.board.getNeighbors(currentCup.index).next;
            currentCup = nextCup;

            if (stones.length === 1) {
                landingCupCount = nextCup.count();
            }

            if (this.cupCheck(nextCup)) {
                const stone = stones.pop();
                nextCup.addToSpace(stone);
            } 
        } while (stones.length !== 0);

        // Check conditions of final cup
        this.resolveTurn(currentCup, landingCupCount);
    }

    resolveTurn(space, landingCount) {
        if (space.type === 'cup' && landingCount === 0) {
            this.capture(space);
        } else if (space.type === 'store' && space.owner === this.currentPlayer.name) {
            this.toggleExtraTurn();
        }
    }

    capture(space) {
        // When landing in an empty cup
        const opposite = this.board.findOpposite(space);
        // If nothing in opposite, capture nothing
        if (opposite.count() === 0) {
            console.log('No stones in the opposite cup!');
            return;
        } 

        // the player captures the stones from the opposite side
        let stones = opposite.pieces;
        opposite.removeAllFromSpace();
3
        // and place in store
        this.board.playerStore(this.currentPlayer).addToSpace(stones);
        console.log(`You just captured ${stones.length} stones!`);
    }

    cupCheck(space) {
        if (space.type === 'cup' || (space.type === 'store' && space.owner === this.currentPlayer.name)) {
            return true;
        } else  {
            return false;
        }
    }

    toggleExtraTurn() {
        this.extraTurn = !this.extraTurn;
    }

    isGameResolved() {
        const cups1 = this.board.playerCups(this.players[0]);
        const cups2 = this.board.playerCups(this.players[1]);

        if (this.allEmpty(cups1) || this.allEmpty(cups2)) {
            this.resolved = true;
        } else {
            this.resolved = false;
        }
    }

    allEmpty(cups) {
        return cups.every(cup => cup.isEmpty());
    }

    determineWinner() {
        return this.playerScore(this.players[0]) > this.playerScore(this.players[1]) ? this.players[0] : this.players[1];
    }

    playerScore(player) {
        let store = this.board.playerStore(player);
        let cups = this.board.playerCups(player);

        if (this.allEmpty(cups)) {
            return store.count();
        } else {
            cups.forEach(cup => {
                const stones = cup.pieces;
                cup.removeAllFromSpace();
                store.addToSpace(stones);
            })

            return store.count();
        }
    }
}

Game.init();