// src/hooks/useLeaderboard.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLeaderboard, postToLeaderboard, resetLeaderboard } from '@/api/api';

export const useFetchLeaderboard = () => {
    return useQuery(['leaderboard'], getLeaderboard);
};

export const useAddToLeaderboard = (onSuccessCallback:() => void) => {
    const queryClient = useQueryClient();
    return useMutation(postToLeaderboard, {
        onSuccess: () => {
            queryClient.invalidateQueries(['leaderboard']);
            onSuccessCallback(); // Call the callback function on success

        },
    });
};

export const useResetLeaderboard = () => {
    const queryClient = useQueryClient();
    return useMutation(resetLeaderboard, {
        onSuccess: () => {
            queryClient.invalidateQueries(['leaderboard']);
        },
    });
};
