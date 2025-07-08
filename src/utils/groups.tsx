import { tempGroup } from "../theme/images"
import { IGroup } from "./types/groups";


export const newGroupPage = `/new-group`
export const getGroupId = (group: IGroup|string) => typeof group === 'string' ? group : group.id;
export const groupURL = (group: IGroup|string) => `/group/${getGroupId(group)}`;
export const getGroupImage = (group: IGroup|string) => tempGroup // `/api/storage/thumbnail/${getGroupId(group)}`;


