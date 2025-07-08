import { AxiosError } from "axios";
import { CopyButton, IMessage, ToggleButton } from "../components";
import { IErrorOptions, IRequestError } from "./request";
import { ReactNode, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FWKReduxState } from "../redux";
import { setApp } from "../redux/appReducer";


export const handleErrorWithMessage = (e: AxiosError, setMessage: (message: IMessage)=>any) =>{
    let errorData = e.response?.data as IRequestError|undefined;
    if( errorData && errorData.error?.message)
        setMessage({ type: "error", message: errorData.error?.message })
}

export type IToastErrorOptions = {
    message: string|ReactNode,
    detailedMessage?: string|ReactNode,
}

export const formatToastError = (error: any, options: IToastErrorOptions) =>{
    return <ToastError error={error} options={options} />
}


export const ToastError = (props: { error: any, options: IToastErrorOptions }) =>{
    const [ transactionId, setTransactionId ] = useState<string|undefined>(
        (props.error as (AxiosError | undefined))?.response?.headers?.['x-transaction-id']
    );

    const { detailedErrors } = useSelector((state: FWKReduxState) => state.app);
    const dispatch = useDispatch();
    return (
        <div className="toast-error">
            <div className="toast-error-message-more-details">
                <ToggleButton
                    label="Details"
                    value={detailedErrors}
                    onToggle={() => dispatch(setApp({ detailedErrors: !detailedErrors }))}
                    lightMode
                />
            </div>
            <div className="toast-error-message">
               { detailedErrors ? props.options.detailedMessage || props.options.message : props.options.message }
            </div>
            {
                detailedErrors && transactionId && (
                    <div className="toast-error-transation-id">
                        <div className="toast-error-transation-id-text">
                            <label>Transaction ID</label>
                            {transactionId}
                        </div>
                        <CopyButton text={transactionId} />
                    </div>
                )
            }
        </div>
    )
}