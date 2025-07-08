import classNames from "classnames";
import { useCallback, useState } from "react";
import { LuClipboard, LuClipboardCheck } from "react-icons/lu";
import { toast } from "react-toastify";
import './CopyButton.css';

type IProps = {
    text: string
    copiedTimeout?: number
}

export const CopyButton = (props: IProps) => {
    const [copied, setCopied] = useState(false);
  
    const handleCopy = useCallback(() => {
        setCopied(false);
        navigator.clipboard.writeText(props.text)
        .then(()=>{
            toast(<>Copied text!</>, { type: "success" })
            setCopied(true);
            setTimeout(()=>{
                setCopied(false);
            }, props.copiedTimeout || 5000)
        })
        .catch(()=>{
            toast(<>Failed to copy text</>, { type: "warning" })
        })
    }, [ props.text, setCopied, props.copiedTimeout ]);
  
    return (
        <div onClick={handleCopy} className={classNames({ "copy-button": true, copied })}>
            {
                copied
                ? <LuClipboardCheck  />
                : <LuClipboard />
            }
        </div>
    );
  };
  