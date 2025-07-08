import { IModerationEvent } from "./types"

export const getEventLink = (event: IModerationEvent) =>{
    return '/moderation/' + event.id
}