import React, { ReactNode } from 'react';
import './FormFieldValidation.css';
import { Logger, useFormFieldReady } from '../../utils';
import { IFormFieldValue } from '../../utils/form';

const logger = new Logger('component', 'FormFieldValidation')

export type IFormValidation = {
    description: ReactNode
    validation: (value?: IFormFieldValue) => boolean
}

export type IFormFieldValidationProps = {
    value: IFormFieldValue
    validation: (IFormValidation[])|undefined
}

export function FormFieldValidation(props: IFormFieldValidationProps) {
    // const fieldFilled = useFieldFilled(props.value);

    const formFieldReady = useFormFieldReady({ validation: props.validation }, props.value)

    if(
        props.validation &&
        !formFieldReady
    )
        return (
            <div className="form-field-validations">
                {
                    props.validation.map((v, idx2) => {
                        if (v.validation(props.value)) return null;
                        return (
                            <div key={idx2} className="form-field-validation">
                                {v.description}
                            </div>
                        )
                    })
                }
            </div>

        )
    return null;
}
export default FormFieldValidation;