import { Dispatch, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setApp } from "../redux/appReducer";
import { UnknownAction } from "@reduxjs/toolkit";
import { getVersions } from "./apis/appOperatorApi";
import { setVersions } from "../redux/versionsReducer";
import { useUser } from "./authentication";
import { useLocation } from "react-router-dom";
import { FWKReduxState, setAuth } from "../redux";
import { toast } from "react-toastify";
import dayjs from "dayjs";

export const despURLS: {
    admin: string,
    collaborative: string,
    sandbox: string,
} = window.location.hostname === 'localhost' 
? {
    admin: 'http://localhost:8200',
    collaborative: 'http://localhost:8100',
    sandbox: 'http://localhost:8000',
}
: window.location.hostname.endsWith('.desp-aas-preprod.acri-st.fr')
? {
    admin: 'https://admin.desp-aas-preprod.acri-st.fr',
    collaborative: 'https://collaborative.desp-aas-preprod.acri-st.fr',
    sandbox: 'https://sandbox.desp-aas-preprod.acri-st.fr',
}
: {
    admin: 'https://admin.desp-aas.acri-st.fr',
    collaborative: 'https://collaborative.desp-aas.acri-st.fr',
    sandbox: 'https://sandbox.desp-aas.acri-st.fr',
}

const setAppDimensions = (dispatch: Dispatch<UnknownAction>) =>{
    dispatch(setApp({
        width: window.innerWidth,
        height: window.innerHeight,
    }))

    let body = document.getElementsByTagName('body')?.[0];
    if(body){
        body.style.setProperty('--app-width', `${window.innerWidth}px`);
        body.style.setProperty('--app-height', `${window.innerHeight}px`);
    }

}

export const appInit = (dispatch: Dispatch<UnknownAction>) =>{
    setAppDimensions(dispatch);

    const currentUser = useUser();
    const userSessionExpiration = useSelector((state: FWKReduxState)=> state.auth.expiration_date );
    
    const [ expirationTimeout, setExpirationTimeout ] = useState<NodeJS.Timeout|undefined>();

    // useEffect(()=>{
    //     if(expirationTimeout) clearTimeout(expirationTimeout);
    //     if(userSessionExpiration){
    //         let expDate = new Date(new Date().getTime() + userSessionExpiration);
    //         // let expDate = new Date(userSessionExpiration * 1000);

    //         console.log("session timeout in", expDate, new Date(userSessionExpiration * 1000), userSessionExpiration);
    //         let expirationTimeout = setTimeout(()=>{
    //             dispatch(setAuth({ user: undefined, roles: undefined, expiration_date: undefined }))
    //             toast(<>Your session has expired.</>, { type: 'info' })
    //         }, 5000)
    //         // let expirationTimeout = setTimeout(()=>{
    //         //     logoutUser()
    //         //     toast(<>Your session has expired.</>, { type: 'info' })
    //         // }, new Date(userSessionExpiration * 1000).getTime() - new Date().getTime())

    //         setExpirationTimeout(expirationTimeout);
    //     }
    //     return ()=>{
    //         clearTimeout(expirationTimeout);
    //     }
    // }, [ userSessionExpiration ])

    useEffect(()=>{
        window.addEventListener('resize', ()=>{
            setAppDimensions(dispatch);
        })

        getVersions()
        .then((versions)=>{
            dispatch(setVersions({ versions }))
        })
    }, [])

    useEffect(()=>{
        if(currentUser){
            try{
                console.log("matomo | setUserId",  currentUser.username);
                (window as any)._paq?.push?.(['setUserId', currentUser.username]);
                (window as any)._paq?.push?.(['trackPageView']);
            }
            catch(e){
                console.error("matomo error", e)
            }
        }
    }, [ currentUser ])
}