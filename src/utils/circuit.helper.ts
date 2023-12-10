import {CableType, Cell} from "@/utils/types/cable.type";
import {CircuitResponse, Direction} from "@/utils/types/board.type";

/**
 * Determines the exit point from a cell based on the cable type, entry point, and rotation.
 *
 * @param cableType - The type of the cable (CURVED, VERTICAL.).
 * @param entryPoint - The direction from which the connection is coming ("left", "right", "top", "bottom").
 * @param rotation - The rotation of the cable in degrees (0, 90, 180, 270).
 * @returns The exit direction from the cell.
 */

export const getExitPoint = (cableType: CableType, entryPoint: Direction, rotation: number): Direction => {
    switch (cableType) {
        case CableType.CURVED:
            if (rotation === 0) {
                return entryPoint === Direction.Left ? Direction.Bottom : Direction.Left;
            }
            if (rotation === 90) {
                return entryPoint === Direction.Bottom ? Direction.Right : Direction.Bottom;
            }
            if (rotation === 180) {
                return entryPoint === Direction.Top ? Direction.Right : Direction.Top;
            }
            // rotation === 270
            return entryPoint === Direction.Top ? Direction.Left : Direction.Top;

        case CableType.VERTICAL:
            if (rotation === 0 || rotation === 180) {
                return entryPoint === Direction.Left ? Direction.Right : Direction.Left;
            }
            // rotation === 90 or 270
            return entryPoint === Direction.Top ? Direction.Bottom : Direction.Top;

        default:
            throw new Error(`Unknown cable type: ${cableType}`);
    }
};

/**
 * Calculates the next cell's coordinates in the grid based on the current cell's exit point.
 *
 * @param x - The x-coordinate of the current cell.
 * @param y - The y-coordinate of the current cell.
 * @param exitPoint - The exit direction from the current cell.
 * @param gridSize - The size of the grid.
 * @returns The coordinates of the next cell or null if the next cell is outside the grid.
 */
export const getNextCell = (x: number, y: number, exitPoint: Direction, gridSize: number): { x: number, y: number } | null => {
    let newX = x, newY = y;

    switch (exitPoint) {
        case Direction.Top:
            newX -= 1;
            break;
        case Direction.Right:
            newY += 1;
            break;
        case Direction.Bottom:
            newX += 1;
            break;
        case Direction.Left:
            newY -= 1;
            break;
        default:
            return null;
    }

    // Check if the new position is within grid bounds
    if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
        return { x: newX, y: newY };
    }

    return null;
};



/**
 * Checks if a cell is correctly connected based on its cable type, rotation, and entry/exit points.
 *
 * @param cell - The cell to check.
 * @param entryPoint - The direction of entry into the cell.
 * @param exitPoint - The expected direction of exit from the cell.
 * @returns True if the cell is correctly connected, false otherwise.
 */
export const isCellCorrectlyConnected=(cell: Cell, entryPoint: Direction, exitPoint: Direction): boolean => {
    switch (cell.cableType) {
        case CableType.CURVED:
            return isCurvedCableCorrectlyConnected(cell.rotation, entryPoint, exitPoint);
        case CableType.VERTICAL:
            return isVerticalCableCorrectlyConnected(cell.rotation, entryPoint, exitPoint);

        default:
            return false;
    }
}

/**
 * Checks if a curved cable is correctly connected based on its rotation and entry/exit points.
 *
 * @param rotation - The rotation of the cable.
 * @param entryPoint - The direction of entry into the cable.
 * @param exitPoint - The expected direction of exit from the cable.
 * @returns True if the curved cable is correctly connected, false otherwise.
 */
export const isCurvedCableCorrectlyConnected=(rotation: number, entryPoint: Direction, exitPoint: Direction): boolean =>{
    // Define the possible connections for a curved cable based on rotation
    const connections: Record<number, { entry: string[], exit: string[] }> = {
        0: { entry: ['left'], exit: ['bottom'] },
        90: { entry: ['bottom','right'], exit: ['right','bottom'] },
        180: { entry: ['right' , 'top'], exit: ['top','right'] },
        270: { entry: ['top','left'], exit: ['left','top'] }
    };

    const connection = connections[rotation];

    // Check if the entryPoint and exitPoint match any of the allowed connections
    return connection && connection.entry.includes(entryPoint) && connection.exit.includes(exitPoint);
}

/**
 * Checks if a vertical cable is correctly connected based on its rotation and entry/exit points.
 *
 * @param rotation - The rotation of the cable.
 * @param entryPoint - The direction of entry into the cable.
 * @param exitPoint - The expected direction of exit from the cable.
 * @returns True if the vertical cable is correctly connected, false otherwise.
 */
export const isVerticalCableCorrectlyConnected=(rotation: number, entryPoint: Direction, exitPoint: Direction): boolean =>{
    // For a vertical cable, it connects top to bottom or bottom to top
    if (rotation === 90 || rotation === 270) {
        return (entryPoint === 'top' && exitPoint === 'bottom') || (entryPoint === 'bottom' && exitPoint === 'top');
    }
    // For horizontal orientation
    return (entryPoint === 'left' && exitPoint === 'right') || (entryPoint === 'right' && exitPoint === 'left');
}

export const isCircuitComplete = (grid: Cell[][]): CircuitResponse => {
    let currentCell = { x: 0, y: 0 };
    let entryPoint = Direction.Left;
    const gridSize = grid.length;
    const visited = new Set<string>();
    const correctPath = []; // Array to store the correct path

    while (true) {
        const cellKey = `${currentCell.x}-${currentCell.y}`;
        if (visited.has(cellKey)) {
            return {isCompleted:false , correctPath:correctPath}; // Cell already visited, break the loop
        }
        visited.add(cellKey);

        const cell = grid[currentCell.x][currentCell.y];
        const exitPoint = getExitPoint(cell.cableType, entryPoint, cell.rotation);
        if (!isCellCorrectlyConnected(cell, entryPoint, exitPoint)) {
            return {isCompleted:false , correctPath:correctPath}
        }
        correctPath.push(currentCell);
        if (currentCell.x === gridSize - 1 && currentCell.y === gridSize - 1 && exitPoint === 'right') {
            // Update the state with the correct path
            return {isCompleted:true , correctPath:correctPath};// Circuit complete
        }

        const nextCell = getNextCell(currentCell.x, currentCell.y, exitPoint, gridSize);
        if (!nextCell) {
            return {isCompleted:false , correctPath:correctPath} // No valid next cell
        }

        currentCell = nextCell;
        entryPoint = exitPoint === Direction.Top ? Direction.Bottom : exitPoint === Direction.Right ? Direction.Left : exitPoint === Direction.Bottom ? Direction.Top : Direction.Right;

    }
};