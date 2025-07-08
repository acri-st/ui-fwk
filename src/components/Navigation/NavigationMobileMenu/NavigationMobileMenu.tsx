import classNames from "classnames"
import { useDispatch, useSelector } from "react-redux";
import { FWKReduxState } from "../../../redux";
import { useCallback } from "react";
import { setApp } from "../../../redux/appReducer";
import NavigationLinks from "../NavigationLinks";
import { doLogin, doLogout, FWKIcons, IRoute, useUser } from "../../../utils";
import './NavigationMobileMenu.css'
import { Blurable } from "../../Blurable/Blurable";
import { Link } from "react-router-dom";
import { UserAvatar } from "../../UserAvatar/UserAvatar";

type IProps = {
    routes: IRoute[]
}

export const NavigationMobileMenu = (props: IProps) =>{
    const app = useSelector((state: FWKReduxState)=> state.app);
    const dispatch = useDispatch();

    const user = useUser();

    const closeMenu = useCallback(()=>{
        dispatch(setApp({ mobileMenuOpen: false }))
    }, [ dispatch ])

    return (
        <Blurable
            id="mobile-menu"
            className={classNames({
                "open": app.mobileMenuOpen
            })}
            onBlurCb={closeMenu}
        >
            <div id="mobile-menu-content">

                {/* MENU */}
                <div id="mobile-menu-links">
                    <NavigationLinks routes={props.routes} id="desktop-links" onLinkClick={closeMenu}/>
                </div>
            </div>
        </Blurable>
    )
}