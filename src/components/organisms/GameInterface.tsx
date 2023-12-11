import Board from "@/components/organisms/Board";
import Timer from "@/components/atoms/Timer";
import React, {useEffect} from "react";
import {ConnectorTypes} from "@/utils/types/cable.type";
import Button from "@/components/atoms/Button";
import useTimerHook from "@/hooks/useTimer.hook";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "@/state/store";
import {setCompletionTime} from "@/state/gameBoardSlice";

interface GameInterfaceProps {
    isCircuitComplete: boolean;
    onStartGame: () => void;
    isGamestart: boolean;
    selectedConnector: ConnectorTypes | null;
}

const GameInterface: React.FC<GameInterfaceProps> = ({isCircuitComplete, isGamestart, onStartGame, selectedConnector}) => {
    const {seconds, startTimer, stopTimer} = useTimerHook(0, isCircuitComplete);
    const isGameActive = useSelector((state: AppState) => state.gameBoard.isGameActive);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isCircuitComplete) {
            stopTimer();
            dispatch(setCompletionTime(seconds));
        }
    }, [isCircuitComplete, seconds, stopTimer, dispatch]);

    return (
        <div className='p-8'>
            <div className='flex flex-col items-center gap-4 mb-4 '>
                <Button disabled={!selectedConnector} onClick={() => {
                    startTimer();
                    onStartGame();
                }} message="(Re)Start Session"/>
                {isGameActive &&
                    <div className="opacity-0 animate-fadeIn">
                        <Timer seconds={seconds}/>
                    </div>}

            </div>

            {!!selectedConnector && isGamestart &&
                <div className="opacity-0 animate-fadeIn">
                    <Board/>
                </div>
            }
        </div>
    );
};
export default GameInterface