export type IGroupParticipant = {
    username: string
    userId: string
    status: any
}

export type IGroupFilters = {
    search: string
    categories: number[]
}

export type IGroup = {
    id: string
    name: string
    despUserId: string
    description: string
    categoryId: string
    categoryName: string
    resourceId: string
    topicId: number
    participants: IGroupParticipant[]
}
export type ICreateGroup = {
    name: string
    category_id: string
    description: string
    private: boolean
    owner: string
}



