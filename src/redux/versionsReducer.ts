import { IVersion } from '../utils/types/appVersion';
import { randomID } from '../utils/tools';
import { createSlice } from '@reduxjs/toolkit';

export type IVersionsState = {
    versions?:IVersion
};
const initialState: IVersionsState = {
}

export const versionsSlice = createSlice({
    name: 'versions',
    initialState,
    reducers: {
        setVersions: (state, action: { payload: Partial<IVersionsState> }) => {
            Object.assign(state, action.payload)
        }
    },
});

export const { setVersions } = versionsSlice.actions;

export default versionsSlice.reducer;