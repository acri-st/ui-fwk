import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { ReactNode } from "react"
import { toast, TypeOptions } from "react-toastify"
import { formatToastError } from "./error"

export type IRequestError = {
    data: any
    error:{
        code: number
        message: string
    }
}

/**
 * A modified axios request that implements authentication to the request
 * @param options Axios request options
 * @returns response of the axios request
 */
export const request = async(options: AxiosRequestConfig)=>{
    return axios(options)
}

export type IErrorOptions = {
    defaultMessage?: ReactNode,
    defaultType?: TypeOptions,
    duration?: number,
}
export const defaultErrorMessage = "An error occurred. Please try again later.";

export const handleRequestError = (
    error: AxiosError|any,
    options?: IErrorOptions
) =>{
    let type = options?.defaultType || 'error';
    let message = options?.defaultMessage || defaultErrorMessage;
    let duration = options?.duration || 10000;
    
    if(error?.response?.data && (error?.response?.data as any)?.error?.message){
        toast(formatToastError(error, { 
            message,
            detailedMessage: (error?.response?.data as any)?.error?.message 
        }), { type: error.status && error.status >= 400 && error.status < 500 ? "warning" : "error", autoClose: duration })
    }
    else if(error.status && error.status === 401){
        toast(formatToastError(error, { message: "Authentication required" }), { type: "warning", autoClose: duration })
    }
    else if(error.status && error.status === 403){
        toast(formatToastError(error, { message: "Access forbidden" }), { type: "warning", autoClose: duration })
    }
    else{
        toast(formatToastError(error, { message }), { type, delay: duration })
    }
}