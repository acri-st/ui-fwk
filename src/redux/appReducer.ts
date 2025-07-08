import { randomID } from '../utils/tools';
import { createSlice } from '@reduxjs/toolkit';

export type IAppState = {
    width?: number
    height?: number
    mobileMenuOpen: boolean
    detailedErrors: boolean
}
const initialState: IAppState = {
    mobileMenuOpen: false,
    detailedErrors: false
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setApp: (state, action: { payload: Partial<IAppState> }) => {
            Object.assign(state, action.payload)
        }
    },
});

export const { setApp } = appSlice.actions;

export default appSlice.reducer;