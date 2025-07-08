import React, { Fragment, ReactNode, useEffect, useState } from 'react';
import './Table.css';
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import classNames from 'classnames';
import { formatDate } from '../../utils/date';
import { FaCircle } from 'react-icons/fa';
import RadioButton from '../RadioButton/RadioButton';
import dayjs from 'dayjs';
import { Logger } from '../../utils/logger';

const logger = new Logger("components", "Table");

export type FieldType = 'text' | 'date' | 'number'


export type ITableHeader = {
    label?: ReactNode
    field: string
    type: FieldType
    format?: (row: ITableRow) => ReactNode
    fieldGetValue?: (row: ITableRow)=> any
}
// export type ITableHeader = {
//     label?: ReactNode
//     field: string
//     format?: (row: ITableRow) => ReactNode
// } & (
//     { type: "number", fieldGetValue: (row: ITableRow)=> number|undefined }
//     | { type: "text", fieldGetValue: (row: ITableRow)=> string|undefined }
//     | { type: "date", fieldGetValue: (row: ITableRow)=> string|undefined }
// )

export type ITableRow = { [key: string]: any };

type ITableOrderBy = {
    field: string
    direction: 'asc' | 'desc'
}

type ITableRowValue = any;

type IProps = {
    headers: ITableHeader[]
    rows?: ITableRow[]
    operations?: (row: ITableRow) => ReactNode
    onRowClick?: (row: ITableRow) => any
    small?: boolean
    className?: string
    loading?: boolean

    // Makes it bullets instead of checkboxes
    selectOne?: boolean
    selected?: any[]
    selectedField?: string
    isSelected?: (row: ITableRow)=>boolean // Defaulted to checking row value === selected[idx]
    onSelection?: (row: ITableRow)=>any
    fieldGetValue?: {
        [field: string]: (row: ITableRow)=> string
    }
}


export function Table(props: IProps) {
    const [orderBy, setOrderBy] = useState<ITableOrderBy | undefined>();
    const [sortedRows, setSortedRows] = useState<ITableRow[] | undefined>(props.rows);


    const handleOrderBy = (field: string, direction?: 'asc' | 'desc') => {
        let _direction: any = direction;

        if (!direction) {
            if (orderBy && orderBy.field === field) {
                if (orderBy.direction === 'desc') {
                    _direction = 'asc'
                }
                else {
                    _direction = undefined;
                    // _direction = 'desc'
                }
            }
            else {
                // First default direction
                _direction = 'desc'
            }
        }

        if(!_direction){
            setOrderBy(undefined)
        }
        else{
            setOrderBy({ field, direction: _direction })
        }
        
    }

    const defaultFormat = (type: FieldType, field: any): ReactNode => {
        if (type === 'text') {
            return field;
        }
        else if (type === 'date') {
            return formatDate(field, true)
        }
        else if (type === 'number') {
            return field;
        }
    }

    const isSelected = (row: ITableRow) => {
        if(props.isSelected)
            return props.isSelected(row)
        else if(props.selectedField)
            return props.selected?.includes(row[props.selectedField])
    }

    useEffect(()=>{
        logger.debug("Order by got changed", orderBy)
        sortRows()
    }, [ orderBy, props.rows ])


    const sortRows = () =>{
        let header: ITableHeader|undefined = orderBy && props.headers.find((h)=>h.field === orderBy.field);
        if(orderBy && header){
            logger.debug("Sorting by", orderBy)

            let sort;
            if(header.type === "text"){
                const getValue = (row: ITableRow)=> header?.fieldGetValue ? header.fieldGetValue(row) as any as string : row[orderBy.field] as string
                sort = orderBy.direction === 'asc'
                ? (r1: ITableRow, r2: ITableRow)=> (getValue(r1)).localeCompare(getValue(r2))
                : (r1: ITableRow, r2: ITableRow)=> (getValue(r2) as string).localeCompare(getValue(r1))
            }
            else if(header.type === "number"){
                const getValue = (row: ITableRow)=> header?.fieldGetValue ? header.fieldGetValue(row)  as any as number : row[orderBy.field] as number
                sort = orderBy.direction === 'asc'
                ? (r1: ITableRow, r2: ITableRow)=> getValue(r1) - getValue(r2)
                : (r1: ITableRow, r2: ITableRow)=> getValue(r2) - getValue(r1)
            }
            // DATE
            else{
                const getValue = (row: ITableRow)=> header?.fieldGetValue ? header.fieldGetValue(row)  as any as string : row[orderBy.field] as string
                sort = orderBy.direction === 'asc'
                ? (r1: ITableRow, r2: ITableRow)=> dayjs(getValue(r1)).millisecond() - dayjs(getValue(r2)).millisecond()
                : (r1: ITableRow, r2: ITableRow)=> dayjs(getValue(r2)).millisecond() - dayjs(getValue(r1)).millisecond();
            }

            setSortedRows([...props.rows || []]?.sort(sort))
        }
        else{
            logger.debug("Order by empty", props.rows)
            setSortedRows(props.rows)
        }
    }


    return (
        <div className={classNames({ "table": true, small: props.small, [props.className || '']: true })}>
            <table>
                <thead>

                    <tr>
                        {
                            props.onSelection &&
                            <th className="table-header table-select-header">

                            </th>
                        }
                        {
                            props.headers.map((h, hIdx) => (
                                <th
                                    className={`table-header ${h.field}`} key={h.field}
                                >
                                    <div 
                                        className={classNames({ "table-header-content": true, "selected": orderBy?.field === h.field })} 
                                        onClick={() => { handleOrderBy(h.field) }}
                                    >
                                        <div className="table-header-value" >
                                            { h.label || h.field }
                                        </div>
                                        <div className="table-header-order-by" >
                                            <div
                                                className={classNames({ 
                                                    "table-header-order-by-direction": true, 
                                                    "selected": orderBy && (orderBy.field === h.field && orderBy.direction === 'asc' )
                                                })}
                                                onClick={(ev) => { 
                                                    ev.stopPropagation();
                                                    if(orderBy && (orderBy.field === h.field && orderBy.direction === 'asc' )){
                                                        setOrderBy(undefined);
                                                    }
                                                    else{
                                                        handleOrderBy(h.field, 'asc') 
                                                    }
                                                }}
                                            >
                                                <BiSolidUpArrow />
                                            </div>
                                            <div
                                                className={classNames({ 
                                                    "table-header-order-by-direction": true, 
                                                    "selected": orderBy && (orderBy.field === h.field && orderBy.direction === 'desc' )
                                                })}
                                                onClick={(ev) => { 
                                                    ev.stopPropagation(); 

                                                    if(orderBy && (orderBy.field === h.field && orderBy.direction === 'desc' )){
                                                        setOrderBy(undefined);
                                                    }
                                                    else{
                                                        handleOrderBy(h.field, 'desc') 
                                                    }
                                                }}
                                            >
                                                <BiSolidDownArrow />
                                            </div>
                                        </div>

                                    </div>
                                </th>
                            ))
                        }
                        {
                            props.operations &&
                            <th className="table-operations"></th>
                        }
                    </tr>
                </thead>
                <tbody>

                    {
                        props.loading
                        ? <tr>
                            {
                                props.headers.map((_, idx) => (
                                    <td key={idx}>
                                        <div className="loading-field loading"/>
                                    </td>
                                ))
                            }
                        </tr>
                        : sortedRows?.map((row, rIdx) => (
                            <tr 
                                className={classNames({
                                    "clickable": props.onRowClick !== undefined || props.onSelection !== undefined
                                })}
                                key={rIdx} onClick={
                                    props.onRowClick 
                                    ? ()=>{ props.onRowClick?.(row) } 
                                    : props.onSelection
                                    ? ()=>{ props.onSelection?.(row) }
                                    : undefined
                                }
                            >
                                {
                                    props.onSelection &&
                                    <td className="table-value table-select-value">
                                        {
                                            props.selectOne
                                            ? <RadioButton onClick={()=>props.onSelection?.(row)} selected={ isSelected(row) }/>
                                            : <></>
                                            // : <CheckBox selected={ isSelected(row) }/>
                                        }
                                    </td>
                                }
                                {

                                    props.headers.map((h, hIdx) => (
                                        <td
                                            className={`table-value ${h.field}`} key={`${rIdx}-${h.field}`}
                                        >
                                            {
                                                h.format
                                                    ? h.format(row)
                                                    : defaultFormat(h.type, row[h.field])
                                            }
                                        </td>
                                    ))
                                }
                                {
                                    props.operations &&
                                    <td
                                        className={`table-operations`}
                                    >
                                        <div className="operations">
                                            {props.operations(row)}
                                        </div>
                                    </td>

                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default Table;