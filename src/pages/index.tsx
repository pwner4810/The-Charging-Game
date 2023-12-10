import React, {useEffect, useState} from "react";
import PlayerForm from "@/components/molecules/PlayerForm";
import {useAddToLeaderboard} from "@/hooks/useLeaderBoard.hook";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppState} from "@/state/store";
import {resetGame} from "@/state/gameBoardSlice";
import {useRouter} from "next/router";
import {PlayerData} from "@/utils/types/leaderBoard.type";
import {ConnectorTypes} from "@/utils/types/cable.type";
import ConnectorTypeSelection from "@/components/organisms/ConnectorTypesSelection";
import GameInterface from "@/components/molecules/GameInterface";
import Header from "@/components/atoms/Header";

export default function Home() {
    const router = useRouter();
    const {completionTime, isCircuitComplete} = useSelector((state: AppState) => state.gameBoard);
    const dispatch: AppDispatch = useDispatch();
    const [selectedConnector, setSelectedConnector] = useState<ConnectorTypes | null>(null);
    const [isGamestart, setGameStart] = useState<boolean>(false)

    const mutation = useAddToLeaderboard(() => {
        navigatePage()
    });

    const handleResetGame = () => {
        setGameStart(true)
        dispatch(resetGame({gridSize: selectedConnector?.gridSize ?? 3}));
    };

    const navigatePage = () => {
        // Navigate to the leaderboard page on success
        router.push('/leaderBoard').then(()=>{
            dispatch(resetGame({gridSize: selectedConnector?.gridSize ?? 3}));
        })
    };

    const handlePlayerSubmit = (playerData: PlayerData) => {
        mutation.mutate(playerData);
    };

    useEffect(() => {
        setGameStart(false)
    }, [selectedConnector])

    return (
        <div className="container mx-auto ">
            <div className="flex flex-col items-center space-y-4 bg-colouryellow-300 p-4 ">
                <Header router={router}/>

                {!isCircuitComplete && <ConnectorTypeSelection
                    selectedConnector={selectedConnector}
                    setSelectedConnector={setSelectedConnector}
                    dispatch={dispatch}
                />}

                <GameInterface
                    isCircuitComplete={isCircuitComplete}
                    onStartGame={handleResetGame}
                    isGamestart={isGamestart}
                    selectedConnector={selectedConnector}
                />

                {isCircuitComplete &&
                    <div>
                        <PlayerForm onPlayerSubmit={handlePlayerSubmit} initialTime={completionTime}/>
                    </div>
                }

            </div>

        </div>
    );
};
