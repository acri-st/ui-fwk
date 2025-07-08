import React, { useState } from 'react';
import './Search.css';
import classNames from 'classnames';
import { FaSearch } from 'react-icons/fa';
import { IFormFieldVerificationProps } from '../../utils/formVerification';
import { FWKIcons } from '../../utils';

export type ISearchProps = {
    id?: string
    value: string
    onChange: (value: string)=>void
    disabled?: boolean
    loading?: boolean

    // searching: boolean
} & IFormFieldVerificationProps;

export const Search = (props: ISearchProps ) =>{
    const [ focused, setFocused ] = useState(false);

    return <div 
        className={classNames({ "search": true, "focused": focused})}
        id={props.id}
    >
        <FaSearch/>
        <input type="text"
            onFocus={()=>setFocused(true)}
            onBlur={()=>setFocused(false)}
            value={props.value}
            onChange={(ev)=> { if(!props.disabled) props.onChange(ev.target.value) }}
        />

        {
            props.value &&
            !props.disabled &&
            <div className="search-cancel" onClick={()=>props.onChange('')}>
                { FWKIcons.cancel }
            </div>
        }

    </div>
}