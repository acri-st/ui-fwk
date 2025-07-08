import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import './CheckList.css';
import classNames from 'classnames';
import Checkbox from '../Checkbox/Checkbox';
import { Search } from '../Search/Search';

export type ICheckListOption = { label?: ReactNode, searchValue?: string, value: any, tooltip?: ReactNode }

export type ICheckListProps = {
    id?: string
    disabled?: boolean
    options: ICheckListOption[]
    values?: any[]
    checkOne?: boolean
    toggleAll?: boolean
    toggleAllLabel?: ReactNode
    onChange: (values: any[])=>any
    searchable?: boolean
}

export function CheckList(props: ICheckListProps) {
    const [ search, setSearch ] = useState('');
    // console.log("CheckList", props.options);

    const filteredOptions = useMemo(()=>{
        return !props.searchable || search === '' ? props.options : props.options.filter((o) => o.searchValue?.toLowerCase().includes(search.toLowerCase()))
    }, [ props.options, search ])

    
    const onToggleAll = useCallback((ev: any)=>{
        if(props.disabled) return;
        if(props.values && (props.values.length === props.options.length))
            props.onChange([])
        else
            props.onChange(props.options.map((o)=>o.value))
    }, [ props.values, props.toggleAll, props.disabled, props.onChange ])

    const onOptionClick = useCallback((value: any)=>
        (ev: any)=>{
            if(props.disabled) return;
            if(!props.values || props.checkOne || (props.values && props.options.length > 1 && (props.values.length === props.options.length))){
                props.onChange([value])
            }
            else{
                let updatedValues = [...props.values];
                let find = props.values.findIndex((v)=> v === value);
                if(find !== -1)
                    updatedValues.splice(find, 1);
                else
                    updatedValues.push(value);
                props.onChange(updatedValues);
            }
        }
    , [ props.values, props.toggleAll, props.checkOne, props.disabled,  props.onChange ])

    return (
        <div
            id={props.id}
            className={classNames({ "check-list": true, "disabled": props.disabled })}
        >
            {
                props.searchable &&
                <Search
                    id="check-list-search"
                    value={search}
                    onChange={(search)=> setSearch(search) }
                />
            }
            {
                props.toggleAll &&
                <div
                    className={classNames({ "check-list-item check-list-toggle-all": true, "checked": props.values && (props.values.length === props.options.length)})}
                    onClick={onToggleAll}
                >
                    <Checkbox checked={props.values && (props.values.length === props.options.length)}/>
                    <label>
                        { props.toggleAllLabel || "Select all" }
                    </label>
                </div>
            }
            <div className="check-list-values simple-scrollbar">
                {
                    filteredOptions.map((opt, idx) => (
                        <div
                            key={opt.value}
                            className={classNames({ "check-list-item": true, "checked": props.values && props.values.includes(opt.value)})}
                            onClick={onOptionClick(opt.value)}
                        >
                            <Checkbox checked={props.values && (props.values && props.values.includes(opt.value))}/>
                            <div className="check-list-label">
                                <label>
                                    { opt.label || opt.value }
                                </label>
                                {
                                    opt.tooltip &&
                                    <div className="check-list-tooltip">
                                        { opt.tooltip }
                                    </div>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default CheckList;
