import {Cell} from "@/utils/types/cable.type";

export interface GameBoardState {
    cells: Cell[][];
    isCircuitComplete: boolean;
    completionTime: number;
    isGameActive: boolean;
    gridSize: number;
    correctPath: { x: number, y: number }[];
}

export interface CircuitResponse {
    correctPath: { x: number, y: number }[];
    isCompleted: boolean;
}

export enum Direction {
    Left = 'left',
    Right = 'right',
    Top = 'top',
    Bottom = 'bottom'
}

export const RotationDegrees = {
    Zero: 0,
    Ninety: 90,
    OneEighty: 180,
    TwoSeventy: 270
};