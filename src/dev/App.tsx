import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import { FWKReduxState } from '../redux';
import '../theme/app.css'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { appInit } from '../utils';


export default () => {
    const dispatch = useDispatch()
    const auth = useSelector((state: FWKReduxState) => state.auth);
    const [loading, setLoading] = useState(true);
    appInit(dispatch);

    useEffect(() => {
        (async () => {
            try {
            }
            catch (e) {
            }
            finally {
                setLoading(false);
            }
        })()
    }, [])

    return (
        <div 
            id="app"
        >
            {
                loading
                    ?
                    null
                    // <LoadingPage />
                    :
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="*" element={<Navigate to={"/"} />} />
                        </Routes>
                    </BrowserRouter>
            }
        </div>
    )
}