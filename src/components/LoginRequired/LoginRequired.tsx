import React, { ReactNode } from 'react';
import './LoginRequired.css';
import { useSelector } from 'react-redux';
import { FWKReduxState } from '../../redux';
import { FWKIcons, doLogin } from '../../utils';
// import { keycloak } from '../../utils/authentication';

export function LoginRequired(props: {
    disabled?: boolean
    children?: ReactNode
    message?: ReactNode
    small?: boolean
}) {
    const { user } = useSelector((state: FWKReduxState) => state.auth);


    if(props.small){
        return <>
            {
                !user
                    ?
                    <div className="login-required small">
                        <p>
                            { props.message || "You must be signed in to access this section."}
                        </p>
                        <div className="button themed" onClick={() => { doLogin() }}>
                            { FWKIcons.login }
                            <label>Sign in</label>
                        </div>
                    </div>
                    : props.children
            }
        </>
        
    }

    return <>
        {
            !user
                ?
                <div className="fixed-page-content">
                    <div className="login-required">
                        <p>
                            { props.message || "You must be signed in to access this section."}
                        </p>
                        <div className="button themed medium" onClick={() => { doLogin() }}>
                            { FWKIcons.login } 
                            <label>Sign in</label>
                        </div>
                    </div>
                </div>
                : props.children
        }
    </>
}

export default LoginRequired;