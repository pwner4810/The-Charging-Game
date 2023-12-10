import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "@/state/store";
import {setGameActive} from "@/state/gameBoardSlice";

const useTimerHook = (initialSeconds = 0, isCircuitComplete: boolean) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const dispatch = useDispatch();
    const isActive = useSelector((state: AppState) => state.gameBoard.isGameActive);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;

        if (isActive && !isCircuitComplete) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!isActive && interval) {
            clearInterval(interval);
        }

        return () => {
            if (interval !== null) clearInterval(interval);
        };
    }, [isActive, isCircuitComplete]);

    const startTimer = () => {
        setSeconds(0);
        dispatch(setGameActive(true))
    };

    const stopTimer = () => {
        dispatch(setGameActive(false))

    };

    return { seconds, startTimer, stopTimer };
};

export default useTimerHook;
