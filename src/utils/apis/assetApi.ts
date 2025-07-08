import { ASSET_TYPE, IAsset, IAssetResponse, ICategory, ICounters, ICreateDatasetResponse, ILicense, ICreateAsset, IAssetVersion } from "../types";
import { getData, postData, putData } from "../connectivity";
import { Logger } from "../logger";
import axios from 'axios';
import { settings } from "../config";


const logger = new Logger("api", "asset-management")

export function createAsset(newDatasetSchema: ICreateAsset, assetType: ASSET_TYPE): Promise<number> {
    const metadata: Record<string, string | string[] | number> = {};
    if (newDatasetSchema.externalURL) {
        metadata['externalURL'] = newDatasetSchema.externalURL;
    }
    return postData<ICreateDatasetResponse>(`${settings.api.asset_management}/`,
        {
            name: newDatasetSchema.name,
            metadata,
            categoryId: null,
            type: assetType,
            image: null,
            licenseId: newDatasetSchema.license || null,
            source: newDatasetSchema.source,
            // isPublic: newDatasetSchema.visibility === ASSET_VISIBILITY.public
            isPublic: true
        })
        .then((response: ICreateDatasetResponse) => {
            return response.inserted[0];
        })
}


export function getAssets(): Promise<IAsset[]> {
    return getData<IAsset[]>(`${settings.api.asset_management}/`)
}
export async function getUserAssets(userId: string): Promise<IAsset[]> {
    return (await getData<IAsset[]>(`${settings.api.asset_management}/user/${userId}`))
}

export async function getAsset(id: string, commit_hash?: string): Promise<IAssetResponse> {
    return getData<IAssetResponse>(`${settings.api.asset_management}/${id}`, { params: { commit_hash } })
}

export function submitAsset(asset: IAsset): Promise<IAsset> {
    return postData(`${settings.api.asset_management}/request-approval/${asset.id}`, undefined)
}

export const getAssetVersions = (asset_id: string | number): Promise<IAssetVersion[]> => {
    return getData<IAssetVersion[]>(`${settings.api.asset_management}/${asset_id}/versions`)
}

export const downloadAssetContent = (asset_id: string | number, commit_hash?: string) => 
    `/api${settings.api.asset_management}/download/content/${asset_id}${commit_hash ? `?commit_hash=${commit_hash}` : ''}`;

const EXPECTED_PROPS = ['metadata', 'categoryId', 'source', 'isPublic', 'licenseId']
export function updateAsset(asset: IAsset): Promise<IAsset> {
    const requestBody = Object.fromEntries(EXPECTED_PROPS.map(key => [key, (asset as Record<string, any>)[key]]));
    return putData(`${settings.api.asset_management}/update/${asset.id}`, requestBody)
}

export function likeAsset(asset: IAsset): Promise<any> {
    return putData<any>(`${settings.api.asset_management}/${asset.id}/like`)
}
export function bookmarkAsset(asset: IAsset): Promise<any> {
    return putData<any>(`${settings.api.asset_management}/${asset.id}/bookmark`)
}

export function getCategories(type?: ASSET_TYPE): Promise<ICategory[]> {
    return getData<ICategory[]>(`${settings.api.asset_management}/categories/${type && type !== ASSET_TYPE['course'] ? type : ''}`)
}

export function getLicenses(): Promise<ILicense[]> {
    return getData<ILicense[]>(`${settings.api.asset_management}/licenses/`)
}

export function getBookmarks(): Promise<IAsset[]> {
    return getData<IAsset[]>(`${settings.api.asset_management}/bookmarks`)
}

export function getCounts(): Promise<ICounters> {
    return getData<ICounters>(`${settings.api.asset_management}/counts/`)
}

export async function deleteAsset(asset: IAsset): Promise<any> {
    return await axios.delete(`${settings.api.asset_management}/${asset.id}/delete`)
}
