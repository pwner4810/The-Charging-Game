// src/components/Board.tsx
import React, {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {rotateCell} from '@/state/gameBoardSlice';
import Cell from './Cell';
import {AppDispatch, AppState} from "@/state/store";
import {Charger} from "@/components/atoms/Charger";
import {Car} from "@/components/atoms/Car";

const Board: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const {cells, correctPath} = useSelector((state: AppState) => state.gameBoard);
    const isGameActive = useSelector((state: AppState) => state.gameBoard.isGameActive);
    const gridSize = cells.length;

    const handleRotate = useCallback(
        (rowIndex: number, colIndex: number) => {
            if (!isGameActive) return;
            dispatch(rotateCell({x: rowIndex, y: colIndex}));
        },
        [dispatch, isGameActive]
    );

    const correctPathSet = useMemo(() => {
        const pathSet = new Set();
        correctPath.forEach(({ x, y }) => pathSet.add(`${x}-${y}`));
        return pathSet;
    }, [correctPath]);

    return (
        <div className="relative flex flex-col gap-0.5">
            {cells.map((row, rowIndex) => (
                <div key={rowIndex} className="flex flex-row justify-center gap-0.5">
                    {row.map((cell, colIndex) => {
                        const isPartOfCorrectPath = correctPathSet.has(`${rowIndex}-${colIndex}`);
                        return (
                            <Cell
                                key={`${rowIndex}-${colIndex}`}
                                cell={cell}
                                gridSize={gridSize}
                                onRotate={() => handleRotate(rowIndex, colIndex)}
                                isPartOfCorrectPath={isPartOfCorrectPath}
                            />
                        );
                    })}
                </div>
            ))}
            <Charger/>
            <Car/>
        </div>
    );
};

export default Board;
