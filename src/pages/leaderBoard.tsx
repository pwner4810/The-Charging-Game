import React from 'react';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import {getLeaderboard} from "@/api/api";
import LeaderboardComponent from "@/components/organisms/LeaderboardComponent"; // Adjust the import path

export const getServerSideProps: GetServerSideProps = async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(['leaderboard'], getLeaderboard);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

const LeaderboardPage: React.FC = () => {
    return <LeaderboardComponent />;
};

export default LeaderboardPage;
