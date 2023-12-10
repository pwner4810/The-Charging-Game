// src/components/Timer.tsx
import React, {useEffect} from 'react';
import useTimerHook from '@/hooks/useTimer.hook';
import {useDispatch, useSelector} from "react-redux";
import {setCompletionTime} from "@/state/gameBoardSlice";
import Button from "@/components/atoms/Button";
import {AppState} from "@/state/store";

interface TimerProps {
    isCircuitComplete: boolean;
    onStartNewGame: () => void;
    disabled: boolean;
}

const Timer: React.FC<TimerProps> = ({isCircuitComplete, onStartNewGame, disabled}) => {
    const {seconds, startTimer, stopTimer} = useTimerHook(0, isCircuitComplete);
    const dispatch = useDispatch();
    const isGameActive = useSelector((state: AppState) => state.gameBoard.isGameActive);

    useEffect(() => {
        if (isCircuitComplete) {
            stopTimer();
            dispatch(setCompletionTime(seconds));
        }
    }, [isCircuitComplete, seconds, stopTimer, dispatch]);

    return (
        <div className='flex flex-col items-center gap-4 p-4'>
            <Button disabled={disabled} onClick={() => {
                startTimer();
                onStartNewGame();
            }} message="(Re)Start Session"/>

            {isGameActive &&
                <div className='items-center gap-4 p-4 bg-gradient-to-r  bg-colouryellow-100 border-2 rounded-lg shadow-lg text-2xl font-bold animate-pulse'>
                    Time : <span className='text-colourgrey-400'>{seconds}s</span>
                </div>}
        </div>
    );
};

export default Timer;
