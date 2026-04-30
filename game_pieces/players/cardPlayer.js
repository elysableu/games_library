export class CardPlayer {
    constructor(num) {
        this.name = `Player${num}`;
        this.hand = [];
        ;
    }

    takeCard(card) {
        this.hand.push(card);
    }

    playCard(card) {
        const index = this.hand.indexOf(card);
        this.hand.splice(index, 1);
    }

    displayHand() {
        let hand = '';

        this.hand.forEach(card => {
            hand += `${card.suit}${card.value} `;
        })

        return hand;
    }

    clearHand() {
        this.hand = [];
    }
}