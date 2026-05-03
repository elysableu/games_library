export class Card {
    static valueMap = {
        'A':  { name: 'Ace',   value: 1  },
        '2':  { name: 'Two',   value: 2  },
        '3':  { name: 'Three', value: 3  },
        '4':  { name: 'Four',  value: 4  },
        '5':  { name: 'Five',  value: 5  },
        '6':  { name: 'Six',   value: 6  },
        '7':  { name: 'Seven', value: 7  },
        '8':  { name: 'Eight', value: 8  },
        '9':  { name: 'Nine',  value: 9  },
        '10': { name: 'Ten',   value: 10 },
        'J':  { name: 'Jack',  value: 11 },
        'Q':  { name: 'Queen', value: 12 },
        'K':  { name: 'King',  value: 13 }
    };

    static suitNamesMap = {
        'H': 'Hearts', 'D': 'Diamonds', 'S': 'Spades', 'C': 'Clubs'
    }

    constructor(suit, value) {
        this.suit = suit;
        this.suitName = Card.suitNamesMap[suit];
        this.value = value;
        this.numVal = Card.valueMap[value].value;
        this.numName = Card.valueMap[value].name;
    }

    display() {
        return `${this.value}${this.suit}`;
    }

    fullDisplay() {
        return `${this.numName} of ${this.suitName}`;
    }
}