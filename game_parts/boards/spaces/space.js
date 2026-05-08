export class Space {
    constructor(name, type) {
        this.name = name;
        this.type = type;
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
            this.events.get(eventName)({ ...data, spacE: this});
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
        return this.pieces.length === 0;
    }

    isSpace() {
        console.log("Yes this is a space!");
    }
}
