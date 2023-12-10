import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Cell} from '@/utils/types/cable.type';
import generateSolvableBoard, {rotateAllCells} from "@/utils/board.helper";
import {GameBoardState} from "@/utils/types/board.type";
import {isCircuitComplete} from "@/utils/circuit.helper";

// Function to initialize the game board with random cables
const initializeBoard = (gridSize: number): Cell[][] => {
    return rotateAllCells(generateSolvableBoard(gridSize));
};

const getDefaultState = (gridSize: number): GameBoardState => ({
    isCircuitComplete: false,
    completionTime: 0,
    isGameActive: false,
    gridSize: gridSize,
    cells: initializeBoard(gridSize),
    correctPath: []
});

const initialState: GameBoardState = getDefaultState(6);

// Game board slice definition using Redux Toolkit
export const gameBoardSlice = createSlice({
    name: 'gameBoard',
    initialState,
    reducers: {
        /**
         * Rotates a cell on the game board and checks if this results in a completed circuit.
         *
         * @param state - The current state of the game board.
         * @param action - the coordinates (x, y) of the cell to rotate.
         */
        rotateCell: (state, action: PayloadAction<{ x: number, y: number }>) => {
            const {x, y} = action.payload;
            // Rotate the cell by 90 degrees
            state.cells[x][y].rotation = (state.cells[x][y].rotation + 90) % 360;
            // Re-evaluate the circuit completion status
            const checkCircuit = isCircuitComplete(state.cells);
            state.isCircuitComplete = checkCircuit.isCompleted;
            state.correctPath = checkCircuit.correctPath;

        },
        /**
         * Resets the game board to a new solvable puzzle based on the specified grid size.
         *
         * @param state - The current state of the game board.
         * @param action - the new grid size.
         */
        resetGame: (state, action: PayloadAction<{ gridSize: number }>) => {
            const {gridSize} = action.payload;
            // Reset the game board to a new solvable puzzle
            state.cells = initializeBoard(gridSize);
            // Set isCircuitComplete to false
            state.correctPath = []

            state.isCircuitComplete = false;
        },
        /**
         * Sets the completion time for solving the puzzle after the puzzle completed.
         *
         * @param state - The current state of the game board.
         * @param action -  completion time in SEC.
         */
        setCompletionTime: (state, action: PayloadAction<number>) => {
            state.completionTime = action.payload;
        },
        setGameActive: (state, action: PayloadAction<boolean>) => {
            state.isGameActive = action.payload;
        },
    },
});

export const {rotateCell, resetGame, setCompletionTime, setGameActive} = gameBoardSlice.actions;
export default gameBoardSlice.reducer;
