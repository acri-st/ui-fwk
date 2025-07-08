import React, {  TextareaHTMLAttributes } from 'react';
import './TextArea.css';
import classNames from 'classnames';
import InputCharLimit, { IInputCharLimit } from '../InputCharLimit/InputCharLimit';
import { IFormFieldValue } from '../../utils';

export function TextArea(props: {
    className?: string
    charLimit?: IInputCharLimit
    placeholder?: string
    id?: string
    value: string|undefined
    onChange: (value:string)=>any
    onCTRLEnter?: (value: IFormFieldValue)=>any
    textAreaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>
}){
    return <div id={props.id} className={classNames({ "text-area": true, [props.className || '']: true })}>
        <textarea
            value={props.value}
            onInput={(ev)=> props.onChange(ev.currentTarget.value) }
            onKeyDown={(ev) => {
                if (ev.ctrlKey && ev.key === 'Enter') {
                    console.log("GOT CTRL ENTER")
                    props.onCTRLEnter?.(props.value)
                }
            }}
            placeholder={props.placeholder}
            {...props.textAreaProps}
        />
        {
            props.charLimit &&
            <InputCharLimit
                value={props.value}
                charLimit={props.charLimit}
            />
        }
    </div>
}
export default TextArea;