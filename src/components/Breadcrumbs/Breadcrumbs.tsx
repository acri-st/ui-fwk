import React, { Fragment, ReactNode } from 'react';
import './Breadcrumbs.css';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export type IBreadcrumb = {
    label: ReactNode
    path: string
} 

export type ICustomBreadcrumb = {
    label: ReactNode
} & (
    | { onClick: ()=>void }
    | { }
)
type IProps = {
    breadcrumbs?: IBreadcrumb[]
    customBreadcrumbs?: ICustomBreadcrumb[]
    padding?: boolean
}

export function Breadcrumbs(props: IProps) {
    return (
        <div className={classNames({ "breadcrumbs": true, "padding": props.padding })}>
            {
                props.breadcrumbs?.map((bc, bcIdx) => (
                    <Fragment key={bcIdx}>
                        {
                            bcIdx < ((props.breadcrumbs?.length || 0) - 1) ?
                                <>
                                    <Link className="breadcrumb"
                                        to={
                                            bcIdx === 0
                                                ? '/'
                                                : 'path' in bc 
                                                    ? `${props.breadcrumbs?.slice(0, bcIdx + 1).map((bc) => 'path' in bc ?  bc.path !== '/' ? bc.path : '' : '' ).join('/')}`
                                                    : ''
                                        }
                                    >
                                        {bc.label}
                                    </Link>
                                    <span>{">>"}</span>
                                </>
                                :
                                <>
                                    <div className="breadcrumb last">
                                        {bc.label}
                                    </div>
                                </>
                        }
                    </Fragment>
                ))
            }
            {
                props.customBreadcrumbs?.map((bc, bcIdx) => (
                    <Fragment key={bcIdx}>
                        {
                            bcIdx < ((props.customBreadcrumbs?.length || 0) - 1) ?
                                <>
                                    <div className="breadcrumb"
                                        onClick={'onClick' in bc ? bc.onClick : undefined}
                                    >
                                        {bc.label}
                                    </div>
                                    <span>{">>"}</span>
                                </>
                                :
                                <>
                                    <div className="breadcrumb last">
                                        {bc.label}
                                    </div>
                                </>
                        }
                    </Fragment>
                ))
            }
        </div>
    )
}
export default Breadcrumbs;