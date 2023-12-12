// components/LeaderboardTable.tsx

import React from 'react';
import { LeaderboardEntry } from "@/utils/types/leaderBoard.type";

interface LeaderboardTableProps {
    data: LeaderboardEntry[];
    filter: string;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ data, filter }) => {
    const filteredData = data
        .filter(entry => entry.name.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => a.seconds - b.seconds)
        .slice(0, 5); // Get the top 5 records

    return (
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
    );
};

export default LeaderboardTable;
