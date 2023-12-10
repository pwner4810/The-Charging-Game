import React, {useState, useMemo, useEffect, useCallback} from 'react';
import { useQuery } from '@tanstack/react-query';
import { getLeaderboard } from "@/api/api";
import useDebounce from "@/hooks/usedebounce.hool";
import Button from "@/components/atoms/Button";
import {useRouter} from "next/router";
import {LeaderboardResponse} from "@/utils/types/leaderBoard.type";

const LeaderboardComponent: React.FC = () => {
    const [filter, setFilter] = useState('');
    const router = useRouter();

    const debouncedFilter = useDebounce(filter, 500); // Debounce the filter input
    const { data, isLoading, isError } = useQuery<LeaderboardResponse, Error>(['leaderboard'], getLeaderboard);

    const filteredData = useMemo(() => {
        const filtered = data?.scores
            .filter(entry => entry.name.toLowerCase().includes(debouncedFilter.toLowerCase()))
            .sort((a, b) => a.seconds - b.seconds)
            .slice(0, 5); // Get the top 5 records

        return filtered || [];
    }, [data, debouncedFilter]); // Depend on debouncedFilter

    if (isLoading) return <div className="text-center">Loading...</div>;
    if (isError) return <div className="text-center text-red-500">Error loading leaderboard</div>;

    return (
        <div className="max-w-2xl mx-auto my-8">
            <Button message="Back to Home" disabled={false} onClick={()=>router.push('/')}/>
            <h1 className="text-2xl font-bold text-center mb-4">Leaderboard</h1>

            <input
                className="w-full p-2 border mb-4"
                type="text"
                placeholder="Filter by name"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />

            <table className="min-w-full table-auto">
                <thead>
                <tr className="bg-gray-100">
                    <th className="px-4 py-2">Rank</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Time (s)</th>
                </tr>
                </thead>
                <tbody>
                {filteredData.length > 0 ? (
                    filteredData.map((entry, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                            <td className="border px-4 py-2 text-center">{index + 1}</td>
                            <td className="border px-4 py-2">{entry.name}</td>
                            <td className="border px-4 py-2 text-center">{entry.seconds}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td className="px-4 py-2 text-center" colSpan={3}>No matching records found</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default LeaderboardComponent;
