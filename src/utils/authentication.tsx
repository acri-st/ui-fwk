import React, { ReactNode } from 'react';
import { AxiosError } from 'axios';
import { createContext, useEffect, useState } from 'react';
import { Logger } from './logger';
import { getData } from './connectivity';
import { useDispatch, useSelector } from 'react-redux';
import { FWKReduxState } from '../redux';
import { setAuth } from '../redux/authReducer';
import { IProfileResponse, IUser } from './types';
import { settings } from './config';

const logger = new Logger("component", "auth")

/**
 * Method to get the login url for the oAuth
 * @returns 
 */
export function getLoginUrl(): string {
    return `${window.location.origin}/api${settings.api.auth}/login`
}

/**
 * Method to logout from the oAuth
 * @returns 
 */
export function getLogoutUrl(): string {
    return `${window.location.origin}/api${settings.api.auth}/logout`
}

export function getProfile(): Promise<IProfileResponse> {
    logger.debug('fetching profile...');
    return getData(`${settings.api.auth}/profile`)
}


export interface IAuthContext {
    doLogin?: () => Promise<void>;
    doLogout?: () => Promise<void>;
}
export const AuthContext = createContext<IAuthContext>({});


type AuthProviderProps = {
    children: ReactNode;
};

export const doLogin = async () => {
    // redirect the user to the login form in keycloak
    location.href = getLoginUrl()
};

export const doLogout = async () => {
    location.href = getLogoutUrl()
};

// export const logoutUser = () => store.dispatch(setAuth({ user: undefined, roles: undefined, expiration_date: undefined }));

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const auth = useSelector((state: FWKReduxState)=> { return state.auth } );
    const dispatch = useDispatch()
    useEffect(() => {
        // if(true){
        //     dispatch(setAuth({
        //         user:{
        //             id: "1",
        //             username: "dummy",
        //             displayName: "dummy",
        //         }
        //     }))
        // }

        if (auth.user === undefined) {
            ;(async() => {
                logger.info('fetching current user...');
                try {
                    const response = await getProfile()
                    logger.debug('User fetched user:', response);
                    dispatch(setAuth({ user: response.user, roles: response.roles, expiration_date: response.expiration_date }));
                } catch (err) {
                    const error = err as unknown as AxiosError
                    if (error.response?.status == 401) { logger.warn('User not signed in:'); }
                    else { logger.error('Error fetching user:', error.response?.status); }
                }
                finally{
                    dispatch(setAuth({ authChecked: true }));
                }

            })();
        }
    }, [])

    return (children);
};


export const useUser = () => useSelector((state: FWKReduxState)=> state.auth.user );
export const useIsUser = (_user?: IUser) => {
    const user = useUser();
    const [ isUser, setIsUser ] = useState(_user && user && user.username === _user.username)
    useEffect(()=>{
        setIsUser(_user && user && user.username === _user.username);
    }, [ _user, user ])

    return isUser
}

export const userProfileImage = (user: IUser|string) => '/api/storage/avatar/' + (typeof user === 'string' ? user : user.id);