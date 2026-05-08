import { Space } from './space.js';

export class FilledSpace extends Space {
    constructor(position) {
        this.x = position.x;
        this.y = position.y;
    }
}