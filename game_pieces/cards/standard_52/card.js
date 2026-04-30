export class Card {
    static numValMap = {
        'A': 1, '2': 2, '3': 3, '4': 4, 
        '5': 5, '6': 6, '7': 7, '8': 8,
         '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13
    }

    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
        this.numVal = Card.numValMap[value];
    }

    display() {
        return `${this.suit}${this.value}`;
    }
}