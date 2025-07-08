import React from 'react';
import './Status.css';
import classNames from 'classnames';
import { FaCircle } from 'react-icons/fa';

export function Status(props: {
    status?: string
    iconOnly?: boolean
}){
    return <div className={classNames({ "status": true, [props.status?.toLowerCase() || '']: true })}>
        <FaCircle/>
        { 
            !props.iconOnly &&
            <span>
                { props.status }
            </span>
        }
    </div>
}
export default Status;