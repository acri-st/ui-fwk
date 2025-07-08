import { settings } from "../config"
import { deleteData, getData, postData } from "../connectivity"
import { IDiscussionPostCreate } from "../types"
import { ICreatePost, IPost, IPostRepliesResult, IPostReply, IPostResult } from "../types/posts"

/**
 * Method to call the search engine to get the posts matching the given text
 */
export function getPosts(params: {
    // q: string, 
    offset?: number, limit?: number, categories?: string, count?: boolean
}): Promise<IPostResult> {
    return getData<IPostResult>(`${settings.api.posts}/`, { params })
}
export function getPost(postId: string): Promise<IPost> {
    return getData<IPost>(`${settings.api.posts}/${postId}`)
}

export const deletePost = (postId: string): Promise<IPost> => {
    return deleteData<IPost>(`${settings.api.posts}/${postId}`)
}

export const postUserCount = (userId: string): Promise<number> => {
    return getData<number>(`${settings.api.posts}/count/${userId}`);
}


export async function createPost(newPost: ICreatePost): Promise<IPost> {
    return await postData<IPost>(`${settings.api.posts}/`, {...newPost, category_id: newPost.category_id?.toString()})
}

export async function getPostReplies(post: IPost): Promise<IPostRepliesResult> {
    return (await getData<IPost>(`${settings.api.discussion}/topic/${post.topicId}`)).posts as IPostReply[]
}
export async function createPostReply(post: IPost, reply: IDiscussionPostCreate): Promise<IPostReply> {
    return await postData<IPostReply>(`${settings.api.discussion}/topic/${post.topicId}`, reply)
}