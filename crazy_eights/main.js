/*
    Crazy Eights:
        Setup:
            - Deal each player 5 cards (7 cards if only 2 players)
            - Remaining deck is stock pile to draw from
            - Flip top card to start discard pile
        Gameplay:
            - Players match top card of discard pile by suit or value
            - Eights are wild -> can be played on top of any card; player must declare suit for next player
        CardDraw:
            - If a player can't match a card or play an 8, player must draw from stock pile until they can make a move
            - Only up to 5 cards (depending on house rules)
        Winning:
            - The first player to rid themselves of their hand

*/

import { input, select, confirm } from '@inquirer/prompts';
import { CardPlayer } from '#players/cardPlayer.js';
import { Deck } from '#game_pieces/cards/standard_52/deck.js';
import { Shuffle } from '#utility/shuffle.js';


class Game {
    // Setup Game (including players, starting hands, disicard pile)
    constructor(numPlayers) {
        this.numPlayers = numPlayers;
        this.players = [];
        this.stock = new Deck();
        this.discard = [];
       
        this.build();
    }

    build() {
        this.addPlayers();
        this.dealCards();
    }

    addPlayers() {
        for (let i = 0; i < this.numPlayers; i++) {
            this.players.push(new CardPlayer(i + 1));
        }

        // Shuffle player order to vary who plays first etc.
        Shuffle.fyShuffle(this.players);
    }

    dealCards() {
        let count = 5;

        if (this.numPlayers === 2) {
            count = 7;
        };

        while(count != 0) {
            this.players.forEach(player => {
                player.takeCard(this.stock.deal());
            })

            count--;
        }

        this.discard.push(this.stock.deal());
    }


    // Game play
    async playGame() {
        // Prompt for game play
        console.log("Let\'s get crazy with some crazy 8\'s!");
        let answer = false;

        while (!answer) {
            answer = await confirm({message: 'It\'s gonna be fun! Is everyone ready to play?'});
        }

        console.log("Ready to play!");

    }
}


const myGame = new Game(2);
console.log(myGame.players[0].hand);
const yourGame = new Game(3);
// console.log(yourGame.players);