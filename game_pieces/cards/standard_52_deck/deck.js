import { Card } from './card.js';

class Deck {
    static suits = ['H', 'D', 'S', 'C'];
    static values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    constructor(jokers = false) {
        this.cards = [];
        // this.jokers = jokers;
        this.populateDeck();
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
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    deal() {
        return this.cards.pop();
    }
}

const myDeck = new Deck();
console.log(myDeck.cards);
myDeck.shuffle();

console.log(myDeck.cards);
console.log(myDeck.deal());