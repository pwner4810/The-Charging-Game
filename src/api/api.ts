// src/api/leaderboardAPI.ts

import {LeaderboardResponse, PlayerData} from "@/utils/types/leaderBoard.type";

const API_URL = 'http://localhost:12345/leaderboard';

export const getLeaderboard = async (): Promise<LeaderboardResponse> => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

export const postToLeaderboard = async (playerData: PlayerData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(playerData),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

export const resetLeaderboard = async () => {
    const response = await fetch(API_URL, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};
