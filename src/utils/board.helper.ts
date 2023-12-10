import { Cell, CableType } from '@/utils/types/cable.type';

export const randomRotation = (): number => {
    const rotations = [0, 90, 180, 270];
    return rotations[Math.floor(Math.random() * rotations.length)];
};

export const randomCableType = (): CableType => {
    const cableTypes = Object.values(CableType);
    return cableTypes[Math.floor(Math.random() * cableTypes.length)];
};

export const createPathCell = (fromDirection: string, toDirection: string): Cell => {
    // Given CableType enum: CURVED ("┐") and VERTICAL ("-")
    if (fromDirection === 'top' && toDirection === 'right') {
        return { cableType: CableType.CURVED, rotation: 180 }; // Curved cable, 270 degrees rotation
    } else if (fromDirection === 'left' && toDirection === 'bottom') {
        return { cableType: CableType.CURVED, rotation: 0 }; // Curved cable, no rotation
    } else if (fromDirection === 'top' && toDirection === 'bottom') {
        return { cableType: CableType.VERTICAL, rotation: 90 }; // Vertical cable, no rotation
    } else if (fromDirection === 'left' && toDirection === 'right') {
        return { cableType: CableType.VERTICAL, rotation: 0 }; // Vertical cable, 90 degrees rotation for horizontal connection
    }

    throw new Error(`Invalid path directions: from ${fromDirection} to ${toDirection}`);
};


export const generateSolvableBoard = (gridLength:number): Cell[][] => {
    const gridSize = gridLength;
    const grid: Cell[][] = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));

    let currentX = 0, currentY = 0;
    let previousDirection = 'left';

    // Start with either right or bottom direction
    let nextDirection = Math.random() < 0.5 ? 'right' : 'bottom';

    while (currentX < gridSize - 1 || currentY < gridSize - 1) {
        grid[currentX][currentY] = createPathCell(previousDirection, nextDirection);

        if (nextDirection === 'right') {
            currentY++;
            previousDirection = 'left';
        } else if (nextDirection === 'bottom') {
            currentX++;
            previousDirection = 'top';
        }

        // Decide next direction
        if (currentX === gridSize - 1) {
            nextDirection = 'right';
        } else if (currentY === gridSize - 1) {
            nextDirection = 'bottom';
        } else {
            nextDirection = Math.random() < 0.5 ? 'right' : 'bottom';
        }
    }

    // Ensure the final cell connects correctly
    grid[gridSize - 1][gridSize - 1] = createPathCell(previousDirection, 'right');

    // Fill the remaining cells with random cables and rotations
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            if (!grid[x][y]) {
                grid[x][y] = { cableType: randomCableType(), rotation: randomRotation() };
            }
        }
    }

    return grid;
};

// Function to rotate all cells in the existing grid
export const rotateAllCells = (grid: Cell[][]): Cell[][] => {
    return grid.map(row =>
        row.map(cell => ({
            ...cell,
            rotation: randomRotation()
        }))
    );
};

export default generateSolvableBoard;
