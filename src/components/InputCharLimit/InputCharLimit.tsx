import React, {  TextareaHTMLAttributes } from 'react';
import './InputCharLimit.css';
import classNames from 'classnames';
import { Logger } from '../../utils';

const logger = new Logger('component', 'InputCharLimit')

export type IInputCharLimit = {
    min?: number,
    max?: number
}

export const validMinMax = (checks: IInputCharLimit, value: string|undefined) => {
    return value !== undefined && (
        (checks.min !== undefined ? value.length >= checks.min : true)
        && 
        (checks.max !== undefined ? value.length <= checks.max : true)
    )
}

export function InputCharLimit(props: {
    charLimit: IInputCharLimit
    value: string|undefined
}){
    return <div className="input-char-limit">
        {
            props.charLimit.min &&
            <div className="input-char-limit-check">
                <label>Min.</label>
                <div className={classNames({ "input-char-limit-check-values": true, "valid": (props.value?.length || 0) >= props.charLimit.min })}>
                    <div className="input-char-limit-value input-char-limit-check-current">
                        { props.value?.length || 0 }
                    </div>
                    <div className="input-char-limit-separator">/</div>
                    <div className="input-char-limit-value input-char-limit-check-verify">
                        { props.charLimit.min }
                    </div>
                </div>
            </div>
        }
        {
            props.charLimit.max &&
            <div className="input-char-limit-check">
                <label>Max.</label>
                <div className={classNames({ "input-char-limit-check-values": true, "valid": (props.value?.length || 0) <= props.charLimit.max })}>
                    <div className="input-char-limit-value input-char-limit-check-current">
                        { props.value?.length || 0 }
                    </div>
                    <div className="input-char-limit-separator">/</div>
                    <div className="input-char-limit-value input-char-limit-check-verify">
                        { props.charLimit.max }
                    </div>
                </div>
            </div>
        }
    </div>
}
export default InputCharLimit;