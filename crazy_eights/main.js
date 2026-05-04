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

import { input, select, confirm, number } from '@inquirer/prompts';
import { CardPlayer } from '#players/cardPlayer.js';
import { Deck } from '#game_parts/cards/standard_52/deck.js';
import { Shuffle } from '#utility/shuffle.js';


class Game {
     static suitChoices = [
                {name: 'Hearts', value:'H'},
                {name: 'Diamonds', value: 'D'},
                {name: 'Spades', value: 'S'},
                {name: 'Clubs', value: 'C'},
            ];

    // Game Object Instantiation
    constructor(numPlayers, computerOpponent) {
        this.numPlayers = numPlayers;
        this.players = [];
        this.computerOpponent = computerOpponent;
        this.humanPlayer;
        this.stock = new Deck(true);
        this.discard = [];
        this.crazySuit = '';
       
        this.build();
    }

    // ------------------ STATIC METHODS ------------------
    static async init() {
         // Prompt for game play
        console.log('Let\'s play with some crazy 8\'s!');
        let answer = false;

        while (!answer) {
            answer = await confirm({message: 'It\'s gonna be fun! Is everyone ready to play?'});
        }

        // Prompt user to select opponent type
        const computerOpponent = await select({
            message: 'Who will your opponent(s) be?',
            choices: [
                {name: 'Human', value: false},
                {name: 'Computer', value: true}
            ]
        })
   
        // Prompt user to input number of players between 2-6
        const numPlayers = await number({
            message: 'How many players (2 to 6)?',
            min: 2,
            max: 6
        });

        console.log('Ready to play!');
        const game = new Game(numPlayers, computerOpponent);
        await game.playGame();
    }

    // ------------------ GAME BUIDLING METHODS ------------------
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

        if(this.computerOpponent) {
            this.humanPlayer = this.players[0];
        }
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

    // ------------------ GAME PLAY METHODS ------------------
    async playGame() {
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
        console.log('________ | _______');
        console.log('|      | | |  *  |');
        if (this.topCard().display().length === 2) {
            console.log(`|  ${this.topCard().display()}  | | |* * *|`);
        } else if (this.topCard().display().length === 3) {
            console.log(`| ${this.topCard().display()}  | | |* * *|`);
        }
        console.log('|      | | |  *  |');
        console.log('________ | _______');
        console.log(`That\'s a ${this.topCard().fullDisplay()}`);
        console.log('');



        if ( this.crazySuit !== '') {
            console.log(`The next card must be ${this.getSuitName(this.crazySuit)}`);
        }

        let play;
        let validPlay = false;
        let playsChecked = [];
        
        if (this.computerOpponent && player !== this.humanPlayer) {
            console.log("Computer making play ================"); 
            this.handDisplay(player);
        }

        do {
            // Determine game type: human vs. human or human vs. computer
            if (this.computerOpponent) {
                // Differentiate between prompted human turns and automated computer turns
                if (player === this.humanPlayer) {
                    console.log("Human making play =================");
                    this.handDisplay(player);
                    play =  await this.humanPlay(player);
                } else { 
                    play = await this.computerPlay(player);
                    console.log('Wanting to play: ' + play.display());
                }
            } else {
                play =  await this.humanPlay(player);
            }
            
            if (play === null) {
                break;
            }

            // Determine play validity
            validPlay = await this.validPlay(play, player);
            
            // Check if valid play, otherwise prompt to try again!
            if (!validPlay) {
                if (!playsChecked.includes(play)) {
                    playsChecked.push(play);
                }
                console.log('Invalid play, try again!');
            }

            // Continue to prompt user until a valid play or user has guessed every card in their hand
        } while (!validPlay && playsChecked.length < player.hand.length);

        if (play === null || (!validPlay && playsChecked.length === player.hand.length)) {
            console.log('Draw time!');
            // Player draws cards until one is valid
            // Adds cards to the player's hand until a valid card is drawn and then reprompts the user to pick a card   
            play = await this.drawUntilValid(player); 
        } 

        // With valid card, player plays card
        player.playCard(play);
        this.discard.push(play);

        // If previous play isEight, then reset crazySuit this turn
        if (!this.isEight(play)) {
            this.resetCrazySuit();
        }

        console.log('End Turn ---------');
        return player;
    }

    async humanPlay(player) {
        const play = await select({
            message: 'What\'s your play?',
            loop: false,
            choices: [ 
                ...player.hand.map((card) => ({
                name: card.fullDisplay(),
                value: card
                })),
                {name: 'Draw!', value: null }
            ]
        });
        
        return play;
    }

    computerPlay(player) {
        const randomIndex = Math.floor(Math.random() * player.hand.length);
        return player.hand[randomIndex];
    }

    async validPlay(card, player) {
        if (this.crazySuit !== '' && this.topCard().value === '8') {
            return card.suit === this.crazySuit || this.isEight(card);
        }

        if (this.isEight(card)) {
            if (this.computerOpponent && player !== this.humanPlayer) {
                this.randomCrazySuit();
                return true;
            }

            await this.promptCrazySuit();
            return true;
        }
        
        return (card.value === this.topCard().value || card.suit === this.topCard().suit);
    }

    async drawUntilValid(player) {
        let card;
        let valid = false;

        do {
            card = this.stock.deal();
            player.takeCard(card);

            valid = await this.validPlay(card, player);

            if (!valid) {
                console.log(`${card.display()}, nope :(`)
            }
        } while (!valid);

        if (!this.computerOpponent || (this.computerOpponent && player === this.humanPlayer)) {
            if(await this.drawPrompting(card)) {
                console.log(card.display());
                return card;
            } else {
                return await this.drawUntilValid(player);
            }
        }
        
        return card;
    }

    async drawPrompting(card) {
        return await confirm({message: `Do you want to play ${card.display()}`});
    }

    // ------------------ UTILITY/HELPER METHODS ------------------
    topCard() {
        return this.discard[this.discard.length - 1];
    }

    handDisplay(player) {
        console.log('Here\'s your hand.');
        console.log(player.displayHand());
    }

    isEight(card) {
        return card.value === '8';
    }

    async promptCrazySuit() {
        this.crazySuit = await select({
            message: 'Woohoo! That\'s a crazy eight!  What suit must your opponent play next?',
            loop: false,
            choices: Game.suitChoices
        });
    }

    randomCrazySuit() {
        const suitIndex = Math.floor(Math.random() * Game.suitChoices.length);
        this.crazySuit = Game.suitChoices[suitIndex].value;
        console.log(this.crazySuit);
    }

    resetCrazySuit() {
        if (this.crazySuit !== '') {
            this.crazySuit = '';
        }
    }

    getSuitName(value) {
        return Game.suitChoices.find( suit => suit.value === value ).name;
    }

    gameResolve(player) {
        return player.hand.length === 0;
    }
}

Game.init();