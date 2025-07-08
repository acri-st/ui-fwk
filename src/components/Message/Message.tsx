import React, { ReactNode, useState } from 'react';
import './Message.css';
import classNames from 'classnames';

export type IMessage = {
    type: 'success'|'error'|'warning'
    message: ReactNode
};

export const useMessage = (_default?: IMessage) => useState<IMessage|undefined>(_default);

export function Message (props: {
    message?: IMessage
}){
    if(!props.message) return null;

    return <div className={classNames({ "message": true, [props.message.type]: true })}>
        { props.message.message }
    </div>
}
export default Message;