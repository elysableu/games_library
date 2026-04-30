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
    // SETUP THE GAME (including players, starting hands, disicard pile)
    constructor(numPlayers) {
        this.numPlayers = numPlayers;
        this.players = [];
        this.stock = new Deck(true);
        this.discard = [];
        this.crazySuit = '';
       
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


    // PLAY THE GAME ----------------------------
    async playGame() {
        // Prompt for game play
        console.log('Let\'s get crazy with some crazy 8\'s!');
        let answer = false;

        while (!answer) {
            answer = await confirm({message: 'It\'s gonna be fun! Is everyone ready to play?'});
        }

        console.log('Ready to play!');

        let resolved = false;
        let currentPlayerIndex = 0;
        
        // Loop throw players until someone's hand size is zero
        do {
            let played = await this.takeTurn(this.players[currentPlayerIndex]);
    
            if (this.gameResolve(played)) {
                console.log(played.hand);
                console.log(`Congrats! You won ${played.name}.`);
                resolved = true;
            }

            currentPlayerIndex = (currentPlayerIndex + 1) % this.players.length;
        } while (!resolved) 
        
    }

    async takeTurn(player) {
        // Print out messages, card stacks, and player hand
        console.log(player.name + ', it\'s your turn!');
        console.log(' Discard | Stock ');
        console.log('------------------');
        console.log(`   ${this.topCard().display()}    |   *`);
        console.log("Should be here: " + this.crazySuit);
        if ( this.crazySuit !== '') {
            console.log(`The next card must be a ${this.crazySuit}`);
        }

        let play;
        let validPlay = false;
        let playsChecked = [];

        do {
            // When player is the human player
            play =  await this.humanPlay(player);
            
            if (play === null) {
                break;
            }

            validPlay = await this.validPlay(play);
            
            // When Player is a digital player
            // play = this.computerPlay(player);
            
            // Check if valid play, otherwise prompt to try again!
            if (!validPlay) {
                if (!playsChecked.includes(play)) {
                    playsChecked.push(play);
                }
                console.log('Invalid play, try again!');
            }
        } while (!validPlay && playsChecked.length < player.hand.length);

        if (play === null || (!validPlay && playsChecked.length === player.hand.length)) {
            console.log('Draw time!');
            // Player draws cards until one is valid
            // Adds cards to the player's hand and returns the valid play
            play = await this.drawUntilValid(player);
            console.log(play.display() + ', finally!');
        } 

        
        // With valid card, player plays card
        player.playCard(play);
        this.discard.push(play);

        if (!this.isEight(play)) {
            this.resetCrazySuit();
        }

        console.log('End Turn ---------');
        return player;
    }

    computerPlay(player) {
        // Compare each card in players hand to the top card of the discard pile

        // IF: any are valid plays -> choose first play or collect all valid plays and select one (randomly) from that collection
        // Discard a valid card to the top of the discard stack
        // AKA remove a card from the player's hand and add it to the top of the discard stack
        // Check player hand size -> if zero then player wins game, else end turn and move on to next player

        // ELSE: require player to draw cards until player draws a valid card
        // Remove card from stock pile and save to variable
        // Check if card is valid -> if so add to the top of the discard pile and end turn, else add to player hand and keep drawing
        
    }

    async humanPlay(player) {
        console.log('Here\'s your hand.');
        console.log(player.displayHand());
        const play = await select({
            message: 'What\'s your play?',
            loop: false,
            choices: [ 
                ...player.hand.map((card) => ({
                name: card.display(),
                value: card
                })),
                {name: 'Draw!', value: null }
            ]
        });
        
        return play;
    }

    topCard() {
        return this.discard[this.discard.length - 1];
    }

    async validPlay(card) {
        if (this.crazySuit !== '' && this.topCard().value === '8') {
            console.log("On eight valid");
            return card.suit === this.crazySuit || this.isEight(card);
        }

        if (this.isEight(card)) {
            console.log("Is eight valid");
             this.crazySuit = await select({
                message: 'Woohoo! That\'s a crazy eight!  What suit must your opponent play next?',
                loop: false,
                choices: [
                    {name: 'Hearts', value:'H'},
                    {name: 'Diamonds', value: 'D'},
                    {name: 'Spades', value: 'S'},
                    {name: 'Clubs', value: 'C'},
                ]
            });
            
            return true;
        }
        console.log("Other valid");
        return (card.value === this.topCard().value || card.suit === this.topCard().suit);
    }

    isEight(card) {
        return card.value === '8';
    }

    resetCrazySuit() {
        if (this.crazySuit !== '') {
            this.crazySuit = '';
        }
     }

    async drawUntilValid(player) {
        let card;
        let valid = false;

        do {
            card = this.stock.deal();
            valid = await this.validPlay(card);

            if (!valid) {
                console.log(`${card.display()}, nope :(`)
                player.takeCard(card);
            }
        } while (!valid);

        return card;
    }

    gameResolve(player) {
        return player.hand.length === 0;
    }
}


const myGame = new Game(2);
// console.log(myGame.players[0].displayHand());
myGame.playGame();
const yourGame = new Game(3);
// console.log(yourGame.stock);
// console.log(yourGame.players);