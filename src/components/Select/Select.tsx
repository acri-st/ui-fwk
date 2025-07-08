import React, { Fragment, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import './Select.css';
import classNames from 'classnames';
import { Blurable } from '../Blurable/Blurable';
import { HiChevronDown } from 'react-icons/hi';
import FormFieldValidation, { IFormValidation } from '../FormFieldValidation/FormFieldValidation';
import { FaCheckSquare, FaSearch, FaSquare } from 'react-icons/fa';
import { Logger } from '../../utils';
import RadioButton from '../RadioButton/RadioButton';
import Checkbox from '../Checkbox/Checkbox';
import Tags from '../Tags/Tags';
import { FiSearch } from 'react-icons/fi';
import { createPortal } from 'react-dom';
// import { MenuItem, Select as _Select } from '@mui/material';


const logger = new Logger('components', 'select')

export type ISelectOption = {
    label?: ReactNode
    value: any
}
export type ISelectProps = {
    options: ISelectOption[]
    value?: any
    onChange: (value: any)=>void
    disabled?: boolean
    placeholder?: ReactNode
    nullable?: boolean
    validation?: IFormValidation[]
    search?: boolean
    selectBoxRef?: React.RefObject<HTMLDivElement>
    id?: string
    className?: string

    multiple?: boolean
}
export function Select (props: ISelectProps){
    const ref = useRef<HTMLDivElement>();
    const selectBoxRef = useRef<HTMLDivElement>(null);
    const [ open, setOpen ] = useState(false);
    // const [ selectedValue, setSelectedValue ] = useState<ReactNode|undefined>();
    const [ selected, setSelectedLabel ] = useState<ISelectOption[]|undefined>();
    const [ position, setPosition ] = useState<{
        x: number | 'auto',
        y: number,
        width: number,
        maxHeight: number,
        bottom: number | 'auto',
        isAbove: boolean
    }|undefined>();

    const [ search, setSearch ] = useState('');
    const [ options, setOptions ] = useState<ISelectOption[]>([]);

    useEffect(()=>{
        if(props.search && search !== ''){
            let s = search.toLocaleLowerCase();
            setOptions(props.options.filter((opt)=> 
                opt.value.toString().toLowerCase().includes(s)
                || (typeof opt.label === 'string' || typeof opt.label === 'number' ? opt.label.toString().toLowerCase().includes(s) : false)
            ))
        }
        else{
            setOptions(props.options)
        }
    }, [ props.options, search ])

    useEffect(()=>{
        if(props.multiple){
            if(!props.value) setSelectedLabel(undefined);
            else{
                let found = []
                if(!Array.isArray(props.value)){ 
                    setSelectedLabel(undefined);
                    logger.error('Invalid value for select mutlitple, must be an array of values');
                }
                else{
                    for(let v of props.value){
                        let find = props.options.find((opts)=> opts.value === v )
                        if(find) found.push(find)
                    }
                }
                if(found.length > 0) {
                    setSelectedLabel(found)
                }
                else{
                    setSelectedLabel(undefined)
                }
            }
        }
        else{
            let find = props.options.find((opts)=> opts.value === props.value )
            if(find)
                setSelectedLabel([find])
            else setSelectedLabel(undefined)
        }
    }, [ props.value, props.options, props.multiple ])


    const closeOptions = useCallback(()=> setOpen(false), []);
    const openOptions = useCallback(()=> setOpen(true), []);

    const getSelectBoxRef = useCallback(()=>{
        if(props.selectBoxRef){
            return props.selectBoxRef;
        }
        return selectBoxRef;
    }, [ props.selectBoxRef ])
    const toggleOptions = useCallback(()=> {
        calculatePosition()
        if(!open){
            getSelectBoxRef().current?.focus();
        }
        setOpen(!open);
    }, [ open ]);


    const calculatePosition = () =>{
        const selectBox = getSelectBoxRef().current;
        if(ref.current && selectBox){
            let box = ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const spaceBelow = windowHeight - box.bottom;
            const spaceAbove = box.top;
            
            // Get the actual content height
            const contentHeight = selectBox.scrollHeight;
            // Cap the max height to either the space available or 280px, whichever is smaller
            const maxHeight = Math.min(280, Math.max(spaceBelow, spaceAbove));
            
            // If space below is less than content height and we have more space above, position above
            const shouldPositionAbove = spaceBelow < contentHeight && spaceAbove > spaceBelow;
            
            setPosition({ 
                x: shouldPositionAbove ? 'auto' : box.bottom, 
                y: box.left, 
                width: box.width,
                maxHeight,
                bottom: shouldPositionAbove ? (windowHeight - box.top) : 'auto',
                isAbove: shouldPositionAbove
            });
        }
    }

    // Update position when options change or when search changes
    useEffect(() => {
        if (open) {
            calculatePosition();
        }
    }, [options, search, open]);

    // Original resize listener
    useEffect(() => {
        calculatePosition();
        window.addEventListener("resize", calculatePosition);
        return () => {
            window.removeEventListener("resize", calculatePosition);
        }
    }, []);

    const onSelect = useCallback((value: any)=>{
        return () =>{
            if(props.multiple){
                logger.debug("currrent value", props.value)
                let values: any[]|undefined;
                if(!props.value){
                    values = [value]
                }
                else{
                    if(!Array.isArray(props.value)){
                        logger.error('Invalid value for select multiple, must be an array of values');
                        // props.onChange([])
                    }
                    else{
                        values = [...props.value];
                        let find = values.findIndex((v)=> value === v);
                        logger.debug("found value", find)
                        if(find !==  -1){
                            values.splice(find, 1)
                        }
                        else{
                            values.push(value)
                        }
                    }
                }
                logger.debug("Selected value", values)
                props.onChange(values)
            }
            else{
                props.onChange(value); closeOptions(); 
            }
        } 
    }, [ props.value, props.multiple, open ])

    // return 'hello'

    // return <_Select
    //     // value={props.value}
    //     // onChange={(ev)=>props.onChange(ev.target.value)}
    //     // options={props.options}
    // />

    return (
        <>
            <Blurable 
                className={classNames({ "select": true, "active": open, "disabled": props.disabled, [props.className || '']: true })}
                onBlurCb={closeOptions}
                id={props.id}
                blurableRef={ref}
                blurExceptions={[getSelectBoxRef()]}
            >
                <div 
                    className={classNames({ "select-value": true, "select-no-value": selected === undefined })}
                    onClick={toggleOptions}
                >
                    <div className="select-value-label">
                        { 
                            selected !== undefined
                            ? 
                                selected.map((s, idx)=>(
                                    <Fragment key={idx}>
                                        { s.label || s.value }
                                        { idx < selected.length - 1 ? ', ': '' }
                                    </Fragment>
                                ))
                            : props.placeholder || "Select option..."
                        }
                    </div>
                    <div className="select-value-icon">
                        <HiChevronDown/>
                    </div>
                </div>
                {open && createPortal(
                    <div
                        className={classNames("select-box", { "select-box-above": position?.isAbove, [ props.className ? props.className + '-select-box' : '']: true })}
                        id={props.id ? props.id + '-select-box' : undefined}
                        style={{
                            position: 'fixed',
                            top: typeof position?.x === 'number' ? position.x : 'auto',
                            left: position?.y,
                            bottom: typeof position?.bottom === 'number' ? position.bottom : 'auto',
                            width: position?.width,
                            maxHeight: position?.maxHeight,
                        }}
                        ref={getSelectBoxRef()}
                        onBlur={closeOptions}
                    >
                        {
                            props.search &&
                            <div className='select-option-search'>
                                <FiSearch />
                                <div className="form-field">
                                    <input 
                                        value={search}
                                        onChange={(ev)=> setSearch(ev.target.value) }
                                        type="text" 
                                    />
                                </div>
                            </div>
                        }
                        <div className="select-options">
                            {
                                props.nullable &&
                                <div
                                className={classNames({"select-option nullable": true, "option-selected": !props.value })}
                                    onClick={onSelect(undefined)}
                                >
                                    None
                                </div>
                            }
                            {
                                options.map((option, idx)=>(
                                    <div 
                                        className={classNames({"select-option": true, "option-selected": option.value === props.value })}
                                        key={idx}
                                        onClick={onSelect(option.value)}
                                    >
                                        {
                                            props.multiple &&
                                            (
                                                <Checkbox checked={selected?.includes(option)} />
                                            )
                                        }
                                        { option.label }
                                    </div>
                                ))
                            }
                        </div>
                    </div>,
                    document.getElementById("app") as Element
                )}

                <FormFieldValidation
                    value={props.value}
                    validation={props.validation}
                />
            </Blurable>

            {
                props.multiple &&
                <div className="select-multiple-values">
                    {
                        selected &&
                        <Tags 
                            tags={selected?.map((s, idx)=>{
                                return { label: s.label || s.value, onClick: onSelect(s.value) }
                            })}
                        />
                        
                    }
                </div>
            }
        </>
    )
}
export default Select;