import React, { ReactNode } from 'react';
import './Checkbox.css';
import classNames from 'classnames';

type IProps = {
    checked?: boolean
}

export function Checkbox(props: IProps) {
    return (
        <div className={classNames({"checkbox": true, "checked": !!props.checked})}/>
    )
}
export default Checkbox;
