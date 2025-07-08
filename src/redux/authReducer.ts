import { randomID } from '../utils/tools';
import { createSlice } from '@reduxjs/toolkit';
import { IUser, IUserRoles } from '../utils/types';

export type IAuthState = {
    roles?: IUserRoles
    user?: IUser
    avatarID: number|string
    admin?: boolean
    developper?: boolean
    endUser?: boolean
    authChecked: boolean,
    expiration_date?: number
}
const initialState: IAuthState = {
    authChecked: false,
    avatarID: randomID()
    // user: {
    //     username: "tpesquet",
    //     email: "thomas.pesquet@esa.int",
    //     firstname: "Thomas",
    //     lastname: "Pesquet",
    //     image: mockProfile
    // }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: { payload: Partial<IAuthState> }) => {
            Object.assign(state, action.payload)
        }
    },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;