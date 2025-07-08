import React, { ReactNode, useContext } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FWKReduxState } from '../redux';
import { Logger } from './logger';
import { getLoginUrl } from './authentication';

const logger = new Logger("utils", "routing")

export function SecuredRoute(props: { children: ReactNode }) {
    const { user } = useSelector((state: FWKReduxState) => state.auth);
    if (!user) {
        logger.debug("Redirect to login")
        window.location.href = getLoginUrl();
    }
    else {
        logger.debug("User authenticated")
        return (
            props.children
        )
    }
}


export default SecuredRoute;