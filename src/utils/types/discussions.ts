export type IDiscussionResponse = {
    id: number
    topics: IDiscussionTopic[]
}
export type IDiscussionTopic = {
    posts: IDiscussionPost[]
    id: number
    title: string
    fancy_title: string
    posts_count: number
    created_at: string
    slug: string
    category_id: number
    username: string
}

export interface IDiscussionPost {
    topic_id: number
    name: string
    message: string
    username: string
    display_username: string
    created_at: string

    user_id?: number
    avatar_template?: string
    cooked?: string
}

export type IDiscussionTopicCreate = {
    title: string
    text: string
    asset_id: string
}

export type IDiscussionPostCreate = {
    text: string
}
