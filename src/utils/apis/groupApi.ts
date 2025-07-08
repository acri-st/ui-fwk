import axios from "axios"
import { settings } from "../config"
import { getData, postData } from "../connectivity"
import { ICreateGroup, IGroup, IGroupParticipant } from "../types/groups"

export const searchGroups = (params?: {
    q?: string, offset?: number, limit?: number, categories?: string
}) => {
    // return tests.slice(params?.offset || 0, params?.limit || 6);
    return getData<IGroup[]>(settings.api.group_management + '/', { params })
}

export const getGroup = async (group_id: string) => {
    // let find = tests.find((g)=> g.id === group_id );
    // return find;

    return (await getData<{groups: [IGroup]}>(`${settings.api.group_management}/${group_id}`)).groups[0];
}

export const createGroup = async (groupForm: ICreateGroup): Promise<IGroup> =>{
    return postData(`${settings.api.group_management}/`, {...groupForm, category_id: groupForm.category_id.toString() })
}


export const deleteGroup = async (group: IGroup): Promise<any> =>{
    return await axios.delete(`${settings.api.group_management}/${group.id}`)
}

export const joinGroup = async (group: IGroup): Promise<IGroup> =>{
    return postData(`${settings.api.group_management}/${group.id}/join`, undefined);
}

export const cancelJoinGroup = async (group: IGroup): Promise<IGroup> =>{
    return postData(`${settings.api.group_management}/${group.id}/cancel-joining`, undefined);
}
export const leaveGroup = async (group: IGroup): Promise<IGroup> =>{
    return postData(`${settings.api.group_management}/${group.id}/leave`, undefined);
}

export const removeGroupMember = async (group: IGroup, member: IGroupParticipant) =>{
    return postData(`${settings.api.group_management}/${group.id}/remove/${member.userId}`, undefined);
}

export const refuseGroupMember = async (group: IGroup, member: IGroupParticipant) =>{
    return postData(`${settings.api.group_management}/${group.id}/refuse/${member.userId}`, undefined);
}
export const acceptGroupMember = async (group: IGroup, member: IGroupParticipant) =>{
    return postData(`${settings.api.group_management}/${group.id}/accept/${member.userId}`, undefined);
}
