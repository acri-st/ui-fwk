import React from 'react';
import './ModalClose.css';
import { FWKIcons } from '../../utils';

type IProps = { 
    onClick: () => void
}
export const ModalClose = (props: IProps) => {
    return (
        <div 
            className="modal-close" 
            onClick={props.onClick}
        >
            { FWKIcons.close }
        </div>
    );
};