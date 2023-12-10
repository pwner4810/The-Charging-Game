import {CableType} from "@/utils/types/cable.type";
import {isCellCorrectlyConnected} from "@/utils/circuit.helper";
import {Direction} from "@/utils/types/board.type";

describe('isCellCorrectlyConnected', () => {
    describe('CURVED Cable Type', () => {
        it('returns true for a correctly connected curved cable', () => {
            const cell = { cableType: CableType.CURVED, rotation: 0 };
            expect(isCellCorrectlyConnected(cell, Direction.Left, Direction.Bottom)).toBeTruthy();
        });

        it('returns false for an incorrectly connected curved cable', () => {
            const cell = { cableType: CableType.CURVED, rotation: 0 };
            expect(isCellCorrectlyConnected(cell, Direction.Top, Direction.Bottom)).toBeFalsy();
        });

    });

    describe('VERTICAL Cable Type', () => {
        it('returns true for a correctly connected vertical cable', () => {
            const cell = { cableType: CableType.VERTICAL, rotation: 0 };
            expect(isCellCorrectlyConnected(cell, Direction.Left, Direction.Right)).toBeTruthy();
        });

        it('returns false for an incorrectly connected vertical cable', () => {
            const cell = { cableType: CableType.VERTICAL, rotation: 0 };
            expect(isCellCorrectlyConnected(cell, Direction.Top, Direction.Right)).toBeFalsy();
        });

    });

});
