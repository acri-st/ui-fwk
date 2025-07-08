import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { euImage } from '../../theme/images';
import './Navigation.css';

import { FiX } from 'react-icons/fi';
import { HiOutlineMenu } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FWKReduxState } from '../../redux';
import { setApp } from '../../redux/appReducer';
import { doLogin, doLogout, FWKIcons, useUser } from '../../utils';
import { IRoute } from '../../utils/navigation';
import { Blurable } from '../Blurable/Blurable';
import NavigationLinks from './NavigationLinks';


const routeIdSuffix = "-nav-item-id"
const profileIdSuffix = "-profile-item-id"

const defaultThreshold = 1000;

type IProps = {
    profileLink?: string
    routes: IRoute[]
    profileRoutes: IRoute[]
    mobileThreshold?: number
    // searchCallback?: () => Promise<void>
}
export function Navigation(props: IProps) {
    const user = useUser();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [profileOpen, setProfileOpen] = useState(false);
    const { mobileMenuOpen } = useSelector((state: FWKReduxState) => state.app)

    const [search, setSearch] = useState('');
    const app = useSelector((state: FWKReduxState) => state.app);

    // const handleSearch = () =>{
    //     props.searchCallback?.(search)
    // }
    const toggleMenu = useCallback(() => {
        dispatch(setApp({ mobileMenuOpen: !mobileMenuOpen }))
    }, [dispatch, mobileMenuOpen])


    useEffect(() => {
        let appDiv = document.getElementById("app")
        if (appDiv) {
            appDiv.style.overflow = mobileMenuOpen ? "hidden" : "auto";
        }
    }, [mobileMenuOpen])


    const [lastScrollY, setLastScrollY] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (!visible && mobileMenuOpen)
            dispatch(setApp({ mobileMenuOpen: false }))
    }, [visible])

    useEffect(() => {
        let appDiv = document.getElementById("app")
        const handleScroll = () => {
            // if(appDiv)
            //     // console.log("DETECTED", lastScrollY, appDiv.scrollHeight - appDiv.offsetHeight)
            if (
                appDiv && (
                    (
                        appDiv.scrollTop > lastScrollY
                        // || (lastScrollY + 150 > (( appDiv.scrollHeight - appDiv.offsetHeight)))
                    )
                )
            ) {
                // Scrolling down
                setVisible(false);
            } else {
                // Scrolling up
                setVisible(true);
            }
            setLastScrollY(appDiv?.scrollTop || 0);
        };

        appDiv?.addEventListener("scroll", handleScroll);
        return () => appDiv?.removeEventListener("scroll", handleScroll);

    }, [lastScrollY]);

    const userLoggedIn = (mobile?: boolean) => (
        user &&
        <Blurable
            className={classNames({ "nav-auth-profile": true, "open": profileOpen })}
            onBlurCb={() => setProfileOpen(false)}
            id="nav-auth-user"
        >
            <div
                className={classNames({ "button themed medium": true, "auth-icon-only": mobile })}
                id="nav-auth-user-button"
            >
                {FWKIcons.user}
                {
                    mobile
                        ? null
                        : user.username
                }
            </div>
            <div className="nav-auth-profile-menu" id="nav-auth-user-menu">
                <div
                    className="nav-auth-profile-links"
                    id="nav-auth-user-menu-links"
                >
                    {
                        props.profileLink &&
                        <NavLink
                            id={"account" + profileIdSuffix}
                            className="nav-auth-profile-link"
                            to={props.profileLink}
                        >
                            Account
                        </NavLink>
                    }
                    {
                        props.profileRoutes.map((p, idx) => (
                            <Link
                                id={p.id + profileIdSuffix}
                                key={idx} className="nav-auth-profile-link"
                                to={"path" in p ? p.path : 'href' in p ? p.href : ''}
                            >
                                {p.label}
                            </Link>
                        ))
                    }
                    <div
                        id={"logout" + profileIdSuffix}
                        className="nav-auth-profile-link"
                        onClick={doLogout}
                    >
                        Logout
                    </div>
                </div>
            </div>
        </Blurable>
    )

    return (
        <>
            <div id="navigation" className={classNames({ "visible": visible, "top": lastScrollY === 0 })}>
                <div className="nav-wrapper">
                    <div className="nav-left-side">
                        <div
                            className="nav-destine-logo destine-logo"
                            onClick={() => {
                                location.href = "https://platform.destine.eu/"
                            }}
                        >
                            <img className="nav-destine-image" src={euImage} />
                            <label className="nav-destine-text">
                                Destination Earth
                            </label>
                        </div>
                        {
                            // props.searchCallback &&
                            // <div className="nav-search">
                            //     <SearchBar
                            //         value={search} onChange={setSearch} searchCallback={props.searchCallback}
                            //     />
                            // </div>
                        }
                    </div>
                    {
                        app.width && app.width > (props.mobileThreshold || defaultThreshold) &&
                        <div id="nav-links">
                            <NavigationLinks routes={props.routes} id="desktop-links" />
                        </div>
                    }
                    <div className="nav-right-side">

                        {
                            app.width && app.width <= (props.mobileThreshold || defaultThreshold)
                                ?
                                <>
                                    {/* MOBILE */}
                                    {
                                        user
                                            ? userLoggedIn(true)
                                            : <div
                                                className="button themed medium auth-icon-only"
                                                onClick={doLogin}
                                                id="nav-auth-login-button"
                                            >
                                                {FWKIcons.login}
                                            </div>
                                    }
                                    <div id="nav-menu"
                                        onClick={toggleMenu}
                                    >
                                        {
                                            mobileMenuOpen
                                                ? <FiX />
                                                : <HiOutlineMenu />
                                        }

                                    </div>
                                </>
                                :
                                <>
                                    {/* DESKTOP */}
                                    <div className="nav-auth">
                                        {
                                            // LOGGED IN
                                            user
                                                ? userLoggedIn(false)
                                                :
                                                // LOGGED OUT
                                                <div
                                                    className={classNames({ "nav-auth-login": true })}
                                                >
                                                    <div
                                                        className="button themed medium"
                                                        onClick={doLogin}
                                                        id="nav-auth-login-button"
                                                    >
                                                        {FWKIcons.login}
                                                        <label>Sign in</label>
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                </>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}
export default Navigation;
