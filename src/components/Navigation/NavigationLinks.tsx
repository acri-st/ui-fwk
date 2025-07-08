import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { RiArrowLeftSFill } from "react-icons/ri";

import { useUser } from '../../utils';
import { IRoute } from '../../utils/navigation';


const routeIdSuffix = "-nav-item-id"

type IProps = {
    routes: IRoute[]
    id?: string
    onLinkClick?: ()=>any
}
export function NavigationLinks(props: IProps) {
    const location = useLocation()
    const user = useUser();

    const routeSelected = (r: IRoute) => {
        return 'path' in r
            ? r.path === "/"
                ? location.pathname === "/"
                : location.pathname.match(new RegExp(`^${r.path}(\/){0,1}`))
            : false
    }

    const routeLink = (r: IRoute) => {
        return 'path' in r ? r.path : 'href' in r ? r.href : ''
    }

    return (                            
        <div className="nav-links" id={props.id}>
            {
                props.routes.map((r, idx) => {
                    if (r.loginRequired && !user) return null;
                    return (
                        <div
                            key={idx}
                            className={classNames({
                                "nav-route": true,
                                "selected": routeSelected(r),
                                "sub-routes": 'subroutes' in r
                            })}
                        >
                            {
                                ('path' in r || 'href' in r)
                                    ?
                                    <Link
                                        id={r.id + routeIdSuffix}
                                        to={routeLink(r)}
                                        className="nav-route-link nav-link"
                                        target={'target' in r ? r.target : undefined}
                                        onClick={props.onLinkClick}
                                    >
                                        {r.label}
                                    </Link>
                                    :
                                    <div
                                        className="nav-route-link"
                                    >
                                        {r.label}
                                        {
                                            r.subroutes &&
                                            <div className="nav-link-chevron"> <RiArrowLeftSFill /> </div>
                                        }
                                    </div>
                            }
                            {
                                r.subroutes &&
                                <>
                                    <div className="nav-sub-links">
                                        {
                                            r.subroutes.map((sr, idy) => {
                                                if ('section' in sr) {
                                                    return (
                                                        <div key={idy} className="nav-link-section">
                                                            {sr.section}
                                                        </div>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <Link
                                                            id={sr.id + routeIdSuffix}
                                                            key={idx + '/' + idy}
                                                            to={routeLink(sr)}
                                                            target={'target' in sr ? sr.target : undefined}
                                                            className={classNames({
                                                                "nav-link": true,
                                                                "selected": routeSelected(sr)
                                                            })}
                                                            onClick={props.onLinkClick}
                                                        >
                                                            {sr.label}
                                                        </Link>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </>
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}
export default NavigationLinks;
