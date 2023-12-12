import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import gameBoardReducer from './gameBoardSlice';

const rootReducer = combineReducers({
    gameBoard: gameBoardReducer,
});

export const makeStore = () => configureStore({
    reducer: rootReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
