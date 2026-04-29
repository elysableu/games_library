export class CardPlayer {
    constructor(num) {
        this.name = `player${num}`;
        this.hand = [];
        ;
    }

    takeCard(card) {
        this.hand.push(card);
    }

    playCard(index) {
        return this.hand.splice(index, 1)[0];
    }

    clearHand() {
        this.hand = [];
    }
}