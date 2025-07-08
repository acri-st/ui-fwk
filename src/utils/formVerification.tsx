import { useEffect, useState } from "react";
import { IFormValidation } from "../components/FormFieldValidation/FormFieldValidation";
import { IInputCharLimit, validMinMax } from "../components/InputCharLimit/InputCharLimit";
import { IFormFieldValue, isFieldFilled } from "./form";

export type IFormFieldVerificationProps = {
    required?: boolean
    validation?: IFormValidation[]
    charLimit?: IInputCharLimit
};


export const formFieldReady = (field: IFormFieldVerificationProps, value: IFormFieldValue) => {
    if(field.charLimit){
        if(!validMinMax(field.charLimit, value)) return false;
    }
    if (field.validation){
        if(
            field.required
            ? true
            : isFieldFilled(value)
        ){
            let b = field.validation.every((v) => v.validation(value));
            if(!b) return false;
        }
    }
    if(field.required){
        let b = isFieldFilled(value);
        if(!b) return false;
    }
    
    return true;
}

export const useFormFieldReady = (field: IFormFieldVerificationProps|undefined, value: IFormFieldValue) =>{
    const [ formFieldIsReady, setFormFieldIsReady ] = useState<boolean>(field ? formFieldReady(field, value) : true);

    useEffect(()=>{
        if(field){
            setFormFieldIsReady(formFieldReady(field, value))
        }
        else{
            setFormFieldIsReady(true)
        }
    }, [ field, value ])

    return formFieldIsReady;

}