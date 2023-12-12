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
import GameInterface from "@/components/organisms/GameInterface";
import CardHeader from "@/components/atoms/CardHeader";

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
        router.push('/leaderBoard').then(() => {
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
        <div className="container mx-auto flex md:items-center justify-center min-h-screen p-4">
            <div
                className="flex flex-col items-center space-y-4 bg-colouryellow-300 p-4 md:border-2 border-gray-900 w-fit rounded ">
                <CardHeader router={router} navigatePage={navigatePage}/>

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
                    <div className="opacity-0 animate-fadeIn">
                        <PlayerForm onPlayerSubmit={handlePlayerSubmit} initialTime={completionTime}/>
                    </div>
                }


                {mutation.isError && (
                    <div className="text-red-500">
                        {(mutation.error as Error).message}
                    </div>
                )}

            </div>

        </div>
    );
};
