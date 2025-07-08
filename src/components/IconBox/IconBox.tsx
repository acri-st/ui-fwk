import React, { ReactNode } from 'react';
import './IconBox.css'
import { FaExclamationTriangle, FaInfoCircle, FaLightbulb } from 'react-icons/fa';
import classNames from 'classnames';

export type IIconBoxProps = {
    children?: ReactNode
    type?: 'warn'|'idea'|'info'
    icon?: ReactNode
}

export const IconBox = (props: IIconBoxProps) =>{
    return (
        <div
            className={classNames({
                "icon-box": true,
                [props.type || '']: true
            })}
        >
            {
                props.icon || (props.type === 'warn' ? <FaExclamationTriangle /> : props.type === 'info' ? <FaInfoCircle/> :  <FaLightbulb/>)
            }
            <div
                className="icon-box-content"
            >
                { props.children }
            </div>
        </div>
    )
}