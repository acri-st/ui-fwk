import React, { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes, useCallback, useEffect, useState } from 'react';
import './FormField.css';
import classNames from 'classnames';
import { IFormFieldVerificationProps, Logger } from '../../utils';
import Table, { ITableHeader, ITableRow } from '../Table/Table';
import Select, { ISelectOption } from '../Select/Select';
import CheckList, { ICheckListOption } from '../CheckList/CheckList';
import InputCharLimit from '../InputCharLimit/InputCharLimit';
import TextArea from '../TextArea/TextArea';
import { IFormFieldValue } from '../../utils/form';
import FormFieldValidation from '../FormFieldValidation/FormFieldValidation';

import { RichTextFormField } from './RichTextFormField';

const logger = new Logger('component', 'FormField')

export type IFormFieldConfigProps = {
    id?: string
    placeholder?: string
    className?: string
    horizontal?: boolean
    label?: ReactNode
    // field: string
    type?: 'string'|'number'|'date'
    disabled?: boolean
    radioSelect?: {
        options: ICheckListOption[]
    }
    table?: {
        rows: ITableRow[]
        selectField: string
        headers?: ITableHeader[]
        selectOne?: boolean
    }
    select?: {
        multiple?: boolean
        options: ISelectOption[]
        search?: boolean
        disabled?: boolean
        selectBoxRef?: React.RefObject<HTMLDivElement>
        nullable?: boolean
    }
    textArea?: {
        textAreaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>
    }
    custom?: (props: {
        placeholder: IFormFieldConfigProps['placeholder'],
        disabled: IFormFieldConfigProps['disabled'],
        value?: IFormFieldValue
        onUpdate: (value:IFormFieldValue)=>any
        onEnter?: ((value: IFormFieldValue)=>any)|undefined
    })=> ReactNode
    richText?: {

    }

    inputProps?: InputHTMLAttributes<HTMLInputElement>
} & IFormFieldVerificationProps;


export type IFormFieldProps = IFormFieldConfigProps & {
    value?: IFormFieldValue
    onUpdate: (value:IFormFieldValue)=>any
    onEnter?: ((value: IFormFieldValue)=>any)|undefined
};

export const getformFieldType = (props: IFormFieldConfigProps) =>{
    if(props.custom) 
        return "custom"
    if('richText' in props && props.richText) 
        return "richText"
    if('textArea' in props && props.textArea) 
        return "textArea"
    else if('radioSelect' in props && props.radioSelect)
        return "radioSelect"
    else if('select' in props && props.select)
        return "select"
    else if('table' in props && props.table)
        return "table"
    else if(props.inputProps && props.inputProps.type === "date")
        return "date"
    return "input"
}


export function FormField(props: IFormFieldProps) {
    

    return <div id={props.id} className={classNames({ 
        "form-field": true, [props.className || '']: true, 
        "horizontal": props.horizontal,
        ["form-field-" + getformFieldType(props)]: true,
    })}>
        {
            props.label &&
            <label>
                {props.label}: {props.required && <div className='required'>*</div>}
            </label>
        }
        <div className="form-field-value">
            {
                'custom' in props && props.custom
                ?
                    props.custom({
                        value: props.value,
                        onUpdate: props.onUpdate,
                        onEnter: props.onEnter,
                        placeholder: props.placeholder,
                        disabled: props.disabled
                    })
                :
                'richText' in props && props.richText
                ?
                    <RichTextFormField
                        {...props}
                    />
                :
                'textArea' in props && props.textArea
                ?
                    <TextArea
                        value={props.value}
                        onChange={props.onUpdate}
                        onCTRLEnter={props.onEnter}
                        placeholder={props.placeholder}
                        textAreaProps={props.textArea.textAreaProps}
                        
                    />
                :
                'radioSelect' in props && props.radioSelect
                        ?
                        <CheckList
                            options={props.radioSelect.options || []}
                            values={[props.value]}
                            checkOne
                            onChange={(values) => { props.onUpdate(values?.[0]) }}
                            disabled={props.disabled}
                        />
                    :
                'select' in props && props.select
                    ?
                    <div className='form-field-select'>
                        <Select
                            placeholder={props.placeholder}
                            // options={props.select.options || []}
                            value={props.value}
                            onChange={props.onUpdate}
                            multiple={props.select.multiple}
                            disabled={props.disabled}
                            { ...props.select }
                        />
                    </div>
                    :
                    'table' in props && props.table
                        ?
                        <Table
                            rows={props.table.rows}
                            headers={props.table.headers || [{ label: props.table.selectField, field: props.table.selectField, type: "text" }]}
                            onSelection={(r) => props.table && props.onUpdate(r[props.table.selectField])}
                            selectedField={props.table.selectField}
                            selectOne={props.table.selectOne}
                            selected={props.table.selectOne ? [props.value] : props.value}
                        />
                        :
                        <input
                            onKeyDown={props.onEnter ? (ev) => { if (ev.key === 'Enter') props.onEnter?.(ev.currentTarget.value) } : undefined}
                            type="text"
                            placeholder={props.placeholder}
                            {...props.inputProps}
                            value={props.value || ''}
                            onChange={(ev) => { props.onUpdate(ev.target.value) }}
                        />
            }
            {
                props.charLimit &&
                <InputCharLimit
                    value={props.value}
                    charLimit={props.charLimit}
                />
            }
            <FormFieldValidation
                value={props.value}
                validation={props.validation}
            />
        </div>
    </div>
}


export default FormField;