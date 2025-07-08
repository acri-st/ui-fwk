
import axios from 'axios';
import { settings } from '../config';
import { getData, uploadData, postData } from '../connectivity';
import { IRepositoryList, IAsset, IUser } from '../types';

/**
 * Method to get the list of files associated to the asset
 * @param repositoryId the repository id in terms of code repository provider
 * @param branch the selected git branch
 * @param path the navigation path to get the list from
 * @returns 
 */
export function listAssetRepository(repositoryId: string, path: string, commit_hash?: string): Promise<IRepositoryList> {
    return getData<IRepositoryList>(`${settings.api.storage}/repository/${repositoryId}/`, { params: { path, commit_hash } })
}

export function uploadAssetContent(repositoryId: string, commitMessage: string, files: File[], path: string): Promise<string> {
    return uploadData<string>(`${settings.api.storage}/upload/content/${repositoryId}/`, files, { repository: JSON.stringify({ commitMessage }), path })
}


export function uploadAssetThumbnail(asset_id: string, image: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', image);
    return postData(`${settings.api.storage}/upload/thumbnail/${asset_id}/`, formData, { headers: { "Content-Type": "multipart/form-data" } })
}

export function uploadAvatar(asset_id: string, image: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', image);
    return postData(`${settings.api.storage}/upload/avatar/${asset_id}/`, formData, { headers: { "Content-Type": "multipart/form-data" } })
}


export async function deleteAssetImage(asset: IAsset): Promise<any> {
    return await axios.delete(`${settings.api.storage}/thumbnail/${asset.id}/`)
}

export async function deleteUserAvatar(user: IUser): Promise<any> {
    return await axios.delete(`${settings.api.storage}/avatar/${user.id}/`)
}
