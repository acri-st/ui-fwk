import React from 'react';
import './RadioButton.css';
import classNames from 'classnames';

export function RadioButton({ selected, onClick }: {
    selected?: boolean
    onClick?: ()=>any
}){
    return <div className={classNames({ "radio-button": true, selected })} onClick={onClick}>
    </div>
}
export default RadioButton;