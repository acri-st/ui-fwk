import { settings } from "../config"
import { getData, postData } from "../connectivity"
import { IModerationEvent } from "../types"

export type IModerationContentResponse = {
    event_count: number
    events: IModerationEvent[]
    errors: any[]
}
export function searchModerationEvents(params?: {
    q: string, offset?: number, limit?: number, categories?: string, source?: string
}): Promise<IModerationContentResponse> {
    return getData(`${settings.api.moderation}/moderation_content`, { params })
}

export function getModerationEvent(event_id:string): Promise<IModerationEvent> {
    return getData(`${settings.api.moderation}/moderation_content/${event_id}`)
}

export function acceptModerationEvent(moderation_id: string): Promise<any> {
    return postData(`${settings.api.moderation}/accept/${moderation_id}`, {})
}
export function rejectModerationEvent(moderation_id: string): Promise<any> {
    return postData(`${settings.api.moderation}/reject/${moderation_id}`, {})
}



