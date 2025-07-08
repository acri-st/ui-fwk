import { useEffect, useState } from "react";

export type IFormFieldValue = any;

export const isFieldFilled = (value: IFormFieldValue) => value !== undefined && value !== '';

export const useFieldFilled = (value: IFormFieldValue) => {
    const [ fieldFilled, setFieldFilled ] = useState(isFieldFilled(value));
    useEffect(()=>{
        setFieldFilled(isFieldFilled(value))
    }, [ value ])
    
    return fieldFilled;
}
