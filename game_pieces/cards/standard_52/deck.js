import { Card } from './card.js';
import { Shuffle } from '#utility/shuffle.js';

export class Deck {
    static suits = ['H', 'D', 'S', 'C'];
    static values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    constructor(shuffled = false) {
        this.cards = [];
        
        this.populateDeck();
        if (shuffled) {
            this.shuffle();
        }

    }

    populateDeck() {
        Deck.suits.forEach(suit => {
            Deck.values.forEach(value => {
                this.cards.push(new Card(suit, value));
            })
        });
    }

    // Fisher-Yates Shuffle -> Add FaroShuffle and RiffleShuffle
    shuffle() {
       Shuffle.fyShuffle(this.cards);
    }

    deal() {
        return this.cards.pop();
    }
}

// Temp Unit Testing ---------------
// const myDeck = new Deck(true);
// console.log(myDeck.cards);
// myDeck.shuffle();

// console.log(myDeck.cards);
// console.log(myDeck.deal());