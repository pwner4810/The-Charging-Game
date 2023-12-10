export interface LeaderboardEntry {
    name: string;
    email: string;
    seconds: number;
}

export interface LeaderboardResponse {
    scores: LeaderboardEntry[];
}

export interface PlayerData {
    name: string;
    email: string;
    seconds: number;
}