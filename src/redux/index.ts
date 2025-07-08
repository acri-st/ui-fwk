import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import appReducer from './appReducer';
import versionsReducer from './versionsReducer';
export * from './authReducer'

export const reducers = {
    auth: authReducer,
    app: appReducer,
    versions: versionsReducer,
}

export const store = configureStore({
    reducer: reducers
});

export type FWKReduxState = ReturnType<typeof store['getState']>