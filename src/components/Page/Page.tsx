import React,{Component, ReactNode, RefObject, useEffect, useLayoutEffect, useState} from 'react';
import './Page.css';
import classNames from 'classnames';
import { background, background2 } from '../../theme/images';
import { useSelector } from 'react-redux';
import { FWKReduxState } from '../../redux';
import Footer, { IFooterProps } from '../Footer/Footer';
import { useLocation, useParams } from 'react-router-dom';

type IProps = {
    id: string
    children: ReactNode
    className?: string
    background2?: boolean
    fixedPageThreshold?: number

    fixedHeight?: boolean

    pageRef?: RefObject<HTMLDivElement>

    withoutFooter?: boolean
    footer?: IFooterProps
    disableScrollTop?: boolean
    withoutRouter?: boolean

    // The html page title, usefull for analytics like matomo
    pageTitle?: string
}

export function Page(props: IProps){
    const appWidth = useSelector(( state: FWKReduxState )=> state.app.width)

    if(!props.disableScrollTop){
        // const { pathname } = useLocation();
        useLayoutEffect(()=>{
            document.getElementById("app")?.scrollTo({
                top: 0,
                left: 0,
                // behavior: "instant", // Optional if you want to skip the scrolling animation
            });
        }, [props.id])
    }

    if(!props.withoutRouter)
        useLocationHandler(props)


    return (
        <>
            <div
                id={classNames({ [props.id]: true})}
                style={{
                    backgroundImage: `url(${props.background2 ? background2 : background})`,
                }}
                className={classNames({ 
                    "page-content": true,  
                    "fixed-height": props.fixedHeight, [props.className || ''] : true,
                    "fixed-full-page": props.fixedPageThreshold !== undefined && appWidth !== undefined && props.fixedPageThreshold >= appWidth
                })}
                ref={props.pageRef}
            >
                <div 
                    className="page-wrapper"
                >
                    {
                        props.children
                    }
                </div>

            </div>
            {
                !props.withoutFooter &&
                <Footer {...props.footer || {}}/>
            }
        </>
    )
}
export default Page;


const useLocationHandler = (props: IProps) =>{
    const location = useLocation();
    
    useEffect(()=>{
        try{
            console.log("matomo | setDocumentTitle", props.pageTitle || document.title);
            (window as any)._paq?.push?.(['setDocumentTitle', props.pageTitle || document.title]);
            (window as any)._paq?.push?.(['trackPageView']);
        }
        catch(e){
            console.error("matomo error", e)
        }
    }, [ props.pageTitle ])

    useEffect(()=>{
        try{
            console.log("matomo | setCustomUrl", location.pathname);
            (window as any)._paq?.push?.(['setCustomUrl', location.pathname]);
            (window as any)._paq?.push?.(['trackPageView']);
        }
        catch(e){
            console.error("matomo error", e)
        }
    }, [ location.pathname ])
}