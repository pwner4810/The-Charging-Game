import {getNextCell} from "@/utils/circuit.helper";
import {Direction} from "@/utils/types/board.type";

describe('getNextCell', () => {
    const gridSize = 5;

    it('moves right from the current position', () => {
        expect(getNextCell(2, 2, Direction.Right, gridSize)).toEqual({ x: 2, y: 3 });
    });

    it('moves left from the current position', () => {
        expect(getNextCell(2, 2, Direction.Left, gridSize)).toEqual({ x: 2, y: 1 });
    });

    it('moves up from the current position', () => {
        expect(getNextCell(2, 2, Direction.Top, gridSize)).toEqual({ x: 1, y: 2 });
    });

    it('moves down from the current position', () => {
        expect(getNextCell(2, 2, Direction.Bottom, gridSize)).toEqual({ x: 3, y: 2 });
    });

    it('returns null when moving right at grid boundary', () => {
        expect(getNextCell(2, gridSize - 1, Direction.Right, gridSize)).toBeNull();
    });

    it('returns null when moving left at grid boundary', () => {
        expect(getNextCell(2, 0, Direction.Left, gridSize)).toBeNull();
    });

    it('returns null when moving up at grid boundary', () => {
        expect(getNextCell(0, 2, Direction.Top, gridSize)).toBeNull();
    });

    it('returns null when moving down at grid boundary', () => {
        expect(getNextCell(gridSize - 1, 2, Direction.Bottom, gridSize)).toBeNull();
    });

});
