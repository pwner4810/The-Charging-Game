import {
    createPathCell,
    generateSolvableBoard,
    randomCableType,
    randomRotation,
    rotateAllCells
} from "@/utils/board.helper";
import {CableType} from "@/utils/types/cable.type";
import {isCircuitComplete} from "@/utils/circuit.helper";

describe('Cable Game Helper Functions for generate and check curcuit', () => {
    test('randomRotation returns a valid rotation', () => {
        const rotation = randomRotation();
        expect([0, 90, 180, 270]).toContain(rotation);
    });

    test('randomCableType returns a valid cable type', () => {
        const cableType = randomCableType();
        expect(Object.values(CableType)).toContain(cableType);
    });

    describe('createPathCell', () => {
        test('returns correct cell for top to right', () => {
            const cell = createPathCell('top', 'right');
            expect(cell).toEqual({ cableType: CableType.CURVED, rotation: 180 });
        });

        // Add more test cases for different directions

        test('throws error for invalid directions', () => {
            expect(() => createPathCell('invalid', 'direction')).toThrow('Invalid path directions');
        });
    });

    test('generateSolvableBoard creates a board of correct size', () => {
        const size = 5;
        const board = generateSolvableBoard(size);
        expect(board.length).toBe(size);
        board.forEach(row => expect(row.length).toBe(size));
    });

    test('rotateAllCells rotates all cells in the grid', () => {
        const initialGrid = [[{ cableType: CableType.CURVED, rotation: 0 }]];
        const rotatedGrid = rotateAllCells(initialGrid);
    });

    test('returns true for a complete circuit', () => {
        const completeCircuitGrid = generateSolvableBoard(6)

        const result = isCircuitComplete(completeCircuitGrid);
        expect(result.isCompleted).toBeTruthy();
    });

    test('returns false for an incomplete circuit', () => {
        const incompleteCircuitGrid = rotateAllCells(generateSolvableBoard(6))

        const result = isCircuitComplete(incompleteCircuitGrid);
        expect(result.isCompleted).toBeFalsy();
    });
});
