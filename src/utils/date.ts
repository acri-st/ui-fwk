import dayjs from "dayjs";


/**
 * Formats the date as a readable string
 * @param date date to format
 * @param time adds time when true (default: false)
 * @returns formatted date string
 */
export const formatDate = (date: string|Date, time?: boolean) =>{
    let _d = typeof date === 'string' ? new Date(date) : date;
    return dayjs(date).format(`DD MMMM YYYY${time ? ' HH:mm' : ''}`)
}