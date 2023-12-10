// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// Import your reducers
import gameBoardReducer from './gameBoardSlice';
// ...import other reducers

const rootReducer = combineReducers({
    gameBoard: gameBoardReducer,
    // ...add other reducers
});

export const makeStore = () => configureStore({
    reducer: rootReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
