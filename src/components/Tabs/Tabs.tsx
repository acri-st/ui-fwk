import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import './Tabs.css';
import classNames from "classnames";

export type ITab = {
    path: string
    label: ReactNode
}

export type ITabProps = {
    id?: string
    tabs: ITab[]
    selected?: string
    vertical?: boolean
    onSelect?: (selected: string)=>any

    // This makes sure it doesnt reload each time but only when required
    pathPrefix?: string
}

export const Tabs = (props: ITabProps) => {
    let location = useLocation();

    const getLocation = (tab: ITab) =>{
        return `${props.pathPrefix || ''}${tab.path}`
    }
    
    const getCurrentLocation = () =>{
        return location.pathname.endsWith("/") ? location.pathname.substring(0, location.pathname.length - 1) : location.pathname;
    }

    if(props.onSelect){
        return (
            <div className={classNames({ "tabs simple-scrollbar": true, "vertical": props.vertical })} id={props.id}>
                {
                    props.tabs.map((t, idx)=>(
                        <div 
                            key={idx} 
                            className={classNames({ 
                                "tab": true, 
                                "selected": props.selected === t.path
                             })} 
                            onClick={()=>props.onSelect?.(t.path)}
                        >
                            { t.label }
                        </div>
                    ))
                }
            </div>
        )

    }
    else{
        return (
            <div className="tabs" id={props.id}>
                {
                    props.tabs.map((t, idx)=>(
                        <NavLink 
                            key={idx} 
                            className={classNames({ 
                                "tab": true, 
                                "selected": getCurrentLocation() === getLocation(t)
                             })} 
                            to={getLocation(t)}
                        >
                            { t.label }
                        </NavLink>
                    ))
                }
            </div>
        )

    }

}