import { settings } from "../config"
import { deleteData, getData, postData } from "../connectivity"
import { IDiscussionPost, IDiscussionPostCreate, IDiscussionResponse, IDiscussionTopic, IDiscussionTopicCreate } from "../types"

export function getDiscussionTopics(assetID: string): Promise<IDiscussionResponse> {
    return getData<IDiscussionResponse>(`${settings.api.discussion}/discussion/${assetID}`)
}


export async function createDiscussionTopic(newTopic: IDiscussionTopicCreate): Promise<IDiscussionPost> {
    return await postData<IDiscussionPost>(`${settings.api.discussion}/topic`, newTopic)
}

export function getDiscussionTopic(topicID: number): Promise<IDiscussionTopic> {
    return getData<IDiscussionTopic>(`${settings.api.discussion}/topic/${topicID}`)
}
export function deleteDiscussionTopic(topicID: number): Promise<IDiscussionTopic> {
    return deleteData<IDiscussionTopic>(`${settings.api.discussion}/topic/${topicID}`)
}


export async function createDiscussionPost(topic: IDiscussionTopic|number, newPost: IDiscussionPostCreate): Promise<IDiscussionPost> {
    return await postData<IDiscussionPost>(`${settings.api.discussion}/topic/${typeof topic === 'number' ? topic : topic.id}`, newPost)
}