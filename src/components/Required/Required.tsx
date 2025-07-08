import './Required.css';
import React, { ReactNode } from 'react';

type IProps = {
    withLabel?: boolean
}

export const Required = (props: IProps) => {
    return (
        <span className='required'>
            *{ props.withLabel ? "Required" : null }
        </span>
    )
}