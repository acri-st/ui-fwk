import React, { ReactNode, useCallback } from 'react';
import './ToggleButton.css';
import classNames from 'classnames';

type IProps = {
    id?: string
    label?: ReactNode
    disabled?: boolean
    value?: boolean
    onToggle: (value: boolean)=>any
    lightMode?: boolean
}

export function ToggleButton (props: IProps){

    const onToggle = useCallback(()=>{
        if(props.disabled) return;
        props.onToggle(!props.value)
    }, [ props.onToggle, props.disabled, props.value ])

    return (
        <div id={props.id} className={classNames({ "toggle-button": true, "toggled": props.value === true, "disabled": props.disabled, "light-mode": props.lightMode })}
            onClick={onToggle}
        >
            <div className="toggle-button-toggle">
                <div className="toggle-button-toggle-dot"/>
            </div>
            {
                props.label &&
                <label>{props.label}</label>
            }
        </div>
    )
}
export default ToggleButton;
