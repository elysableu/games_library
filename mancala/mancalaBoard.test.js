import { describe, it, expect } from 'vitest';
import { MancalaBoard } from './mancalaBoard.js';

describe('MancalaBoard', () => {
    it('finds the cup on opposite side of the board', () => {
        const mBoard = new MancalaBoard();

        const space1 = mBoard.board[9];
        const space2 = mBoard.board[3];
        const space3 = mBoard.board[6];
        const opp1 = mBoard.board[5];
        const opp2 = mBoard.board[11];
        const opp3 = mBoard.board[8];

        expect(mBoard.findOpposite(space1)).toBe(opp1);
        expect(mBoard.findOpposite(space2)).toBe(opp2);
        expect(mBoard.findOpposite(space3)).toBe(opp3);
    })
}) 