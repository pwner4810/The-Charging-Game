import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getLeaderboard } from "@/api/leaderBoard.api";
import useDebounce from "@/hooks/usedebounce.hool";
import Button from "@/components/atoms/Button";
import { useRouter } from "next/router";
import { LeaderboardResponse } from "@/utils/types/leaderBoard.type";
import LeaderboardTable from "@/components/molecules/LeaderBoardTable";

const LeaderboardComponent: React.FC = () => {
    const [filter, setFilter] = useState('');
    const router = useRouter();

    const debouncedFilter = useDebounce(filter, 500); // Debounce the filter input
    const { data, isLoading, isError } = useQuery<LeaderboardResponse, Error>(['leaderboard'], getLeaderboard);

    if (isLoading) return <div className="text-center">Loading...</div>;
    if (isError) return <div className="text-center text-red-500">Error loading leaderboard</div>;

    return (
        <div className="max-w-2xl mx-auto my-8 p-4">
            <Button message="Back to Home" disabled={false} onClick={() => router.push('/')}/>
            <h1 className="text-2xl font-bold text-center mb-4">Leaderboard</h1>

            <input
                className="w-full p-2 border mb-4"
                type="text"
                placeholder="Filter by name"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />

            <LeaderboardTable data={data?.scores || []} filter={debouncedFilter} />
        </div>
    );
};

export default LeaderboardComponent;
