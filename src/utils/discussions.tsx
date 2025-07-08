import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { IPostFilters } from "./types";
dayjs.extend(relativeTime)

export const defaultFilters = (): IPostFilters => (JSON.parse(JSON.stringify({ 
    // search: '', 
    categories: [],
    offset: 0,
})))

export const formatPostTime = (time: string) =>{
    return dayjs(time + 'Z').fromNow()
}
export const formatPostReplyTime = (time: string) =>{
    return dayjs(time).fromNow()
}