export enum CableType {
    CURVED = "┐",
    VERTICAL = "-",
}

export interface Cell {
    cableType: CableType;
    rotation: number; // 0, 90, 180, 270 degrees
}

export interface ConnectorTypes {
    label: string
    gridSize: number
    iconPath:string
}

