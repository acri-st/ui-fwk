import React, { createRef, HTMLProps, RefObject, useEffect } from 'react';
import _ from 'lodash';

export type BlurableOptions = {
    blurableRef?: RefObject<any>
    // List of ref objects that are excluded from bluring the component
    blurExceptions?: RefObject<any>[]
}

type IProps = {
    // ========= OPTIONS ============
    onBlurCb: () => void
    isInput?: boolean
    validateButton?: () => void
} & HTMLProps<HTMLDivElement> & BlurableOptions


const omitFromSpread = [
    'blurableRef',
    'onBlurCb',
    'blurExceptions',
    'validateButton',
    'isInput'
]

export function Blurable(props: IProps) {

    const ref = props.blurableRef || createRef<HTMLDivElement>();
    const validateRef = props.blurableRef || createRef<HTMLDivElement>();

    const handleClick = (e: any) => {
        if (
            ref.current?.contains(e.target)
            || validateRef?.current?.contains(e.target)
            || props.blurExceptions?.some((r) => { return r.current?.contains?.(e.target) })
        ) {

            return;
        }
        props.onBlurCb()
    }

    useEffect(()=>{
        document.addEventListener('mousedown', handleClick, false);
        return ()=>{
            document.removeEventListener('mousedown', handleClick, false);

        }
    })

    if (props.isInput) {
        return (
            <>
                <input {..._.omit(props, omitFromSpread)} ref={ref} />
                {
                    props.validateButton &&
                    <div className="validate-button tt" ref={validateRef} onClick={(e) => {
                        e.stopPropagation();
                        props.validateButton && props.validateButton()
                    }}>
                        <i className="fas fa-check" />
                        {/* <div className="tt-tooltip">validate</div> */}
                    </div>
                }
            </>
        )
    }
    else {
        return (
            <div {..._.omit(props, omitFromSpread)} ref={ref}>
                {props.children}
            </div>
        )
    }
}


export default (Blurable)