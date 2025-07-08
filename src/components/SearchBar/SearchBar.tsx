import React, { createRef, useEffect, useState } from 'react';
import './SearchBar.css';
import classNames from 'classnames';
import { FaSearch } from 'react-icons/fa';
import { Loading } from '../Loading/Loading';
import { IFormFieldVerificationProps, useFormFieldReady } from '../../utils/formVerification';
import { FWKIcons } from '../../utils';
import FormFieldValidation from '../FormFieldValidation/FormFieldValidation';

export type ISearchBarProps = {
    id?: string
    value: string
    onChange: (value: string)=>void
    disabled?: boolean
    loading?: boolean

    // searching: boolean
} & IFormFieldVerificationProps;

export function SearchBar (props: ISearchBarProps ){
    const [ focused, setFocused ] = useState(false);
    const [ tempValue, setTempValue ] = useState(props.value);

    const [ searchReady, setSearchReady ] = useState<boolean>();

    const searchFieldReady = useFormFieldReady(props, tempValue);

    useEffect(()=>{
        setTempValue(props.value)
    }, [  props.value ])

    useEffect(()=>{
        setSearchReady(searchFieldReady && !props.disabled && props.value !== tempValue)
    }, [  props.value, tempValue, searchFieldReady, props.disabled ])



    const search = () =>{
        if(searchReady){
            props.onChange(tempValue);
        }
    }


    return <div 
        className={classNames({ "search-bar": true, "focused": focused})}
        id={props.id}
    >
        <FaSearch/>
        <input type="text"
            onFocus={()=>setFocused(true)}
            onBlur={()=>setFocused(false)}
            value={tempValue}
            // onChange={(ev)=> { if(!searching) props.onChange(ev.target.value) }}
            onChange={(ev)=> { if(!props.loading) setTempValue(ev.target.value) }}
            // disabled={searching}
            onKeyDown={(ev)=>{
                if(ev.key === 'Enter'){
                    search();
                }
            }}
        />

        {
            props.value !== tempValue
            &&
            <div className="search-cancel" onClick={()=>setTempValue(props.value)}>
                { FWKIcons.cancel }
            </div>
        }
        
        <div 
            className={classNames( {"search-button": true, "disabled": !searchReady })}
            onClick={search}
        >
            {
                props.loading
                ? <><Loading/></>
                : <>search</>
            }
        </div>

        <FormFieldValidation
            validation={props.validation}
            value={tempValue}
        />
    </div>
}
export default SearchBar;