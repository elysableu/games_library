export class Space {
    constructor(name, type, owner = null) {
        this.name = name;
        this.type = type;
        this.owner = owner;
        this.events = new Map();
        this.pieces = [];
    }

    // Will add interactions to a specific space
    // Accepts parameters of the following format:
    on(eventName, fn) {
        this.events.set(eventName, fn);
    }

    trigger(eventName, data) {
        if (this.events.has(eventName)) {
            this.events.get(eventName)({ ...data, space: this});
        }
    }

    addToSpace(piece) {
        this.pieces.push(piece);
    }

    removeFromSpace(piece) {
        const index = this.pieces.indexOf(piece);
        if (index !== -1) this.pieces.splice(index, 1);
    }

    isEmpty() {
        return this.count() === 0;
    }

    count() {
        return this.pieces.length;
    }

    display() {
        return this.name ? `[${this.name}]` : '[ ]';
    }
}
