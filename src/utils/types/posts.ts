import { IDiscussionPost } from "./discussions"

export type ICreatePost = {
    title: string
    message: string
    category_id?: number
}

export type IPost = {
    id: string
    title: string
    message: string
    despUserId: string
    categoryName: string
    likes: number
    liked?: boolean
    created_at: string
    topicId: string
    reply_count: number
    posts?: IPostReply[]
}

export type IPostReply = IDiscussionPost

export type IPostResult = IPost[]

export type IPostRepliesResult = IPostReply[]

export type ICreatePostReply = {
    message: string
}

export type IPostFilters = {
    // search: string
    categories: number[]
    offset: number
}