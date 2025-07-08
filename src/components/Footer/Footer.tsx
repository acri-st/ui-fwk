import React, { useCallback, useEffect, useState } from 'react';
import './Footer.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import destineLogo from './destination-earth.png'
import fundedLogo from './funded-by-EU.png'
import implementedLogo from './implemented-by.png'
import ecmwfLogo from './ecmwf.png'
import esaLogo from './esa.png'
import eumetsatLogo from './eumetsat.png'
import despLogo from './desp_logo.svg'
import { FaTimes } from 'react-icons/fa';
import { HiOutlineMenu } from 'react-icons/hi';
import { FiX } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { FWKReduxState } from '../../redux';
import { FWKIcons, getVersions, IVersion, useTermsAndConditionsLink } from '../../utils';
import { Tooltip } from 'react-tooltip'


export type IFooterProps = {
    fixed?: boolean
}
const logos = [
    { logo: destineLogo, link: 'https://destination-earth.eu/'},
    { logo: fundedLogo, link: 'https://european-union.europa.eu/'},
    { logo: implementedLogo },
    { logo: ecmwfLogo, link: 'https://www.ecmwf.int/'},
    { logo: esaLogo, link: 'https://www.esa.int/'},
    { logo: eumetsatLogo, link: 'https://www.eumetsat.int/'},
]

const mobileThreshold = 950;

export function Footer (props: IFooterProps){
    const [lastScrollY, setLastScrollY] = useState(0);
    const [visible, setVisible] = useState(false);
    const [footerMenuOpen, setFooterMenuOpen] = useState(false);
    const [mobileMode, setMobileMode] = useState(false);

    const [ versions, setVersions ] = useState<IVersion|undefined>()

    const { width } = useSelector((state:FWKReduxState)=>state.app)

    useEffect(() => {
        let appDiv = document.getElementById("app")
        const handleScroll = () => {
            if (
                appDiv && (
                    (appDiv.scrollTop < lastScrollY)
                    && !(lastScrollY + 50 > (( appDiv.scrollHeight - appDiv.offsetHeight)))
                )
            ) {
                // Scrolling up
                setVisible(false);
            } else {
                // Scrolling down
                setVisible(true);
            }
            setLastScrollY(appDiv?.scrollTop || 0);
        };

        appDiv?.addEventListener("scroll", handleScroll);
        return () => appDiv?.removeEventListener("scroll", handleScroll);
        
    }, [lastScrollY]);

    const toggleMenu = useCallback(()=>{
        setFooterMenuOpen((prev)=>(!prev))
    }, [])

    useEffect(()=>{
        if(!visible && footerMenuOpen)
            setFooterMenuOpen(false)
    }, [ visible ])

    useEffect(()=>{
        setMobileMode(!!(width && width < mobileThreshold))
    }, [ width ])

    const links = (
        logos.map((i, idx)=>(
            !i.link
            ?   <div className="footer-menu-link"  key={idx}>
                <img src={i.logo}/>
            </div>
            : <a className="footer-menu-link" key={idx} target='_blank'href={i.link}>
                <img src={i.logo}/>
            </a>
        ))
    )
    
    const termsAndConditionsLink = useTermsAndConditionsLink();

    useEffect(()=>{
        getVersions().then((versions)=>{
            setVersions(versions)
        })
    }, [])

    return (
        <div id="footer" className={classNames({ "visible": visible, "fixed": props.fixed })}>
            <div id="footer-content">
                <div id="footer-desp-logo">
                    <img src={despLogo}/>
                    
                </div>
        
                {
                    !mobileMode &&
                    <div id="footer-icons">
                        { links }

                        {
                            versions &&
                            <div id="footer-menu-versions">
                                <div id="footer-menu-versions-icon">
                                    { FWKIcons.info }
                                </div>
                                <Tooltip anchorSelect="#footer-menu-versions-icon" place="top">
                                    <div id="footer-menu-versions-container">
                                        {
                                            versions.components &&
                                            Object.entries(versions.components).map(([component, version])=>(
                                                <div className="footer-menu-version">
                                                    <span className="footer-menu-version-component">{component}</span>
                                                    <span className="footer-menu-version-version">{version.version}</span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </Tooltip>
                            </div>
                        }
                    </div>
                }

                {
                    // mobileMode &&
                    <div id="footer-menu-section">

                        <div id="footer-menu-section-content">

                            <div 
                                id="footer-menu-button"
                                onClick={toggleMenu}
                            >
                                {
                                    footerMenuOpen 
                                    ? <FiX />
                                    : <HiOutlineMenu/>
                                }
                            </div>

                            <div 
                                id="footer-menu" 
                                className={classNames({ "open": footerMenuOpen })}
                            >
                                <Link className="footer-menu-link" to={"https://platform.destine.eu/code-of-conduct/"} target='_blank'>
                                    Code of conduct
                                </Link>
                                <Link className="footer-menu-link" to={termsAndConditionsLink} target='_blank'>
                                    Terms & Conditions
                                </Link>
                                <Link className="footer-menu-link" to={"https://platform.destine.eu/privacy-policies/"} target='_blank'>
                                    Privacy Policies
                                </Link>
                                <Link className="footer-menu-link" to={"https://platform.destine.eu/cookie-policy/"} target='_blank'>
                                    Cookie Policy
                                </Link>
                                <Link className="footer-menu-link" to={"https://platform.destine.eu/legal-notice/"} target='_blank'>
                                    Legal Notice
                                </Link>
                                {
                                    mobileMode &&
                                    <div id="footer-menu-partner-links">
                                        { links }
                                    </div>
                                        
                                }
                            </div>

                        </div>

                    </div>
                }

            </div>
        </div>
    )
}
export default Footer;
