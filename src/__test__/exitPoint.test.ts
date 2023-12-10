import {CableType} from "@/utils/types/cable.type";
import {Direction} from "@/utils/types/board.type";
import {getExitPoint} from "@/utils/circuit.helper";

describe('getExitPoint', () => {
    describe('CURVED Cable Type', () => {
        it('returns bottom for left entry with 0 rotation', () => {
            expect(getExitPoint(CableType.CURVED, Direction.Left, 0)).toEqual(Direction.Bottom);
        });

        it('returns right for bottom entry with 90 rotation', () => {
            expect(getExitPoint(CableType.CURVED, Direction.Bottom, 90)).toEqual(Direction.Right);
        });

        it('returns top for right entry with 180 rotation', () => {
            expect(getExitPoint(CableType.CURVED, Direction.Right, 180)).toEqual(Direction.Top);
        });

        it('returns left for top entry with 270 rotation', () => {
            expect(getExitPoint(CableType.CURVED, Direction.Top, 270)).toEqual(Direction.Left);
        });

    });

    describe('VERTICAL Cable Type', () => {
        it('returns right for left entry with 0 rotation', () => {
            expect(getExitPoint(CableType.VERTICAL, Direction.Left, 0)).toEqual(Direction.Right);
        });

        it('returns bottom for top entry with 90 rotation', () => {
            expect(getExitPoint(CableType.VERTICAL, Direction.Top, 90)).toEqual(Direction.Bottom);
        });

        it('returns left for right entry with 180 rotation', () => {
            expect(getExitPoint(CableType.VERTICAL, Direction.Right, 180)).toEqual(Direction.Left);
        });

        it('returns top for bottom entry with 270 rotation', () => {
            expect(getExitPoint(CableType.VERTICAL, Direction.Bottom, 270)).toEqual(Direction.Top);
        });

    });
    it('throws error for unknown cable type', () => {
        expect(() => getExitPoint('UNKNOWN' as CableType, Direction.Left, 0)).toThrow('Unknown cable type');
    });
});
