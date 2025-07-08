export type IModerationEvent = {
    id: string
    routing_key: string
    exchange: string,
    status: string,
    user_id: string,
    date: string,
    url: string,
    fonctionnal_area: string,
    content_id: string,
    content: {
        data_by_type: {
            [type: string]: IModerationDataByType[]
        }
    },
    history: string[]

}

export type IModerationDataByType = {
    name: string // The field that got controlled
    value: string // the value
    rejected_reasons: string[] // Reasons
}
