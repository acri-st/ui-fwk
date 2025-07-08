import React from 'react';
import './Loading.css';
import classNames from 'classnames';

// https://cssloaders.github.io/

export function Loading (props: {
    disabled?: boolean
}){
    return <>
        <span className={classNames({ "loader": true, "disabled": props.disabled })}></span>
    </>
}
export default Loading;