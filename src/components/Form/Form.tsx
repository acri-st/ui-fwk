import React from 'react';
import './Form.css';
import { FormField, IFormFieldConfigProps } from '../FormField/FormField';
import { formFieldReady } from '../../utils';


export type IFormValue = { [field: string]: any };
export type IFormField = IFormFieldConfigProps & { field: string };
export type IFormFieldsConfig = { [field: string]: IFormField };


type IProps = {
    horizontal?: boolean
    fields: IFormField[]
    value?: IFormValue
    updateForm: (updates: Partial<IFormValue>)=>any
    onEnter?: ()=>any
}


export const formReady = (fields: IFormField[], value?: IFormValue) => {
    if (!value) return false;
    for (let field of fields) {
        let fieldReady = formFieldReady(field, value[field.field])
        if(!fieldReady) return false;
    }
    return true;
}

export function Form(props: IProps) {

    const updateForm = (updates: Partial<IFormValue>) => {
        props.updateForm({ ...props.value, ...updates })
    }

    return <div className="form">
        {
            props.fields.map((f, idx) => (
                <FormField
                    {...f}
                    key={idx}
                    value={props.value?.[f.field]}
                    onUpdate={(value)=>updateForm({ [f.field]: value })}
                    onEnter={()=>{ if(formReady(props.fields, props.value)) props.onEnter?.()  } }
                    horizontal={props.horizontal}
                />
            ))
        }
    </div>
}
export default Form;