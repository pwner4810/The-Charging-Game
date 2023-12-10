// Add this inside your src/store/index.ts
import {useMemo} from 'react';
import {AppState, AppStore, makeStore} from "@/state/store";

let store: AppStore | undefined;

export const initializeStore = (preloadedState?: AppState) => {
    let _store = store ?? makeStore();

    // Merge the current state with the initial state if it exists
    if (preloadedState && store) {
        _store.dispatch({ type: 'game/initializeState', payload: preloadedState });
        store = undefined;
    }

    // For SSR and SSG, always create a new store
    if (typeof window === 'undefined') return _store;

    // Create the store once in the client
    if (!store) store = _store;

    return _store;
};

export function useStore(initialState: AppState) {
    return useMemo(() => initializeStore(initialState), [initialState]);
}
