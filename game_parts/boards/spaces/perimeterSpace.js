import { Space } from './space.js';

export class PerimeterSpace extends Space {
    constructor(name, type, index) {
        super(name, type)
        this.index = index;
    }
}