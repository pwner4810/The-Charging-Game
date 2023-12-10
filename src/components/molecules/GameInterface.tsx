import Board from "@/components/molecules/Board";
import Timer from "@/components/molecules/Timer";
import React from "react";
import {ConnectorTypes} from "@/utils/types/cable.type";

interface GameInterfaceProps {
    isCircuitComplete: boolean;
    onStartGame: () => void;
    isGamestart:boolean;
    selectedConnector: ConnectorTypes | null;
}

const GameInterface: React.FC<GameInterfaceProps> = ({ isCircuitComplete,isGamestart, onStartGame, selectedConnector }) => {
   return (
        <div>
            <Timer isCircuitComplete={isCircuitComplete} onStartNewGame={onStartGame}
                   disabled={!selectedConnector}/>
            {!!selectedConnector && isGamestart && <Board/>}
        </div>
    );
};
export default GameInterface