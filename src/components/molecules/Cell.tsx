import React, {memo, useEffect, useState} from 'react';
import {CableType, Cell as CellType} from '../../utils/types/cable.type';
import {CustomIcon} from "@/components/atoms/CustomImage";

interface CellProps {
    cell: CellType;
    onRotate: () => void;
    gridSize:number;
    isPartOfCorrectPath:boolean
}

const Cell: React.FC<CellProps> = memo(({ cell, gridSize, onRotate, isPartOfCorrectPath }) => {
    const getRotationClass = (rotationValue?: number) => {
        switch (rotationValue) {
            case 90: return '-rotate-90';
            case 180: return '-rotate-180';
            case 270: return '-rotate-270';
            default: return '';
        }
    };

    function getCableIcon(cableType: CableType): JSX.Element {
        switch (cableType) {
            case CableType.CURVED:
                return <CustomIcon imagePath='/img/curved2.svg' width={150 / gridSize} />;
            case CableType.VERTICAL:
                return <CustomIcon imagePath='/img/horizontal2.svg' width={150 / gridSize} />;
            default:
                return <span>Unknown Cable</span>;
        }
    }


    const rotationClass = getRotationClass(cell?.rotation);
    // Tailwind classes for the cell's content
    const cellContentClasses = `w-full h-full flex justify-center items-center cursor-pointer transform transition duration-300 ease-in-out ${rotationClass}`;
    const correctPathStyle = isPartOfCorrectPath ? 'ring-2 ring-green-900' : '';
    const cellSize = 18 / gridSize;
    const cellStyle = { width: `${cellSize}rem`, height: `${cellSize}rem` };
    const cableStyle = cell ? getCableIcon(cell.cableType) : '';

    return (
        <div style={cellStyle} className={` border border-gray-400 flex bg-colouryellow-100 justify-center items-center shadow-lg hover:shadow-red-400 transition-shadow duration-300 ${correctPathStyle} `}>
            <div className={`${cellContentClasses} ${cableStyle} `} onClick={onRotate} tabIndex={0}>
                {getCableIcon(cell.cableType)}
            </div>
        </div>
    );
});

Cell.displayName = 'Cell'; // Explicitly setting the display name
export default Cell;