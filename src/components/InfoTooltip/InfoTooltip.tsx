import React, { ReactNode, useMemo } from 'react';
import { FWKIcons } from '../../utils';
import classNames from 'classnames';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import './InfoTooltip.css';

export type InfoTooltipProps = {
    tooltip: ReactNode
    id?: string
    className?: string
    tooltipClassName?: string
}

export const InfoTooltip = (props: InfoTooltipProps) => {
    const id = useMemo(() => {
        return props.id || `info-tooltip-${Math.random().toString(36).substring(2, 15)}`;
    }, [props.id]);
    return (
        <>
            <div 
                id={id}
                className={classNames({
                    'info-tooltip': true,
                    [props.className || '']: true,
                })}
            >
                {/* { FWKIcons.info } */}
                { FWKIcons.question }
            </div>
            <Tooltip
                anchorSelect={`#${id}`}
                clickable
                
                place="bottom"
                // effect="solid"
                className={classNames({
                    'info-tooltip-tooltip': true,
                    [props.tooltipClassName || '']: true,
                })}
            >
                { props.tooltip }
            </Tooltip>
        </>
    );
};