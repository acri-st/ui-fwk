import { settings } from "../config";
import { getData, postData, deleteData, patchData } from "../connectivity";
import { IMetadata, ISearchResult } from "../types";
import { ISubscription, ISubscriptionCreate } from "../types/subscription";

/**
 * Method to call the search engine to get the assets matching the given text
 */
export function searchAssets(params: {
    q: string, offset?: number, limit?: number, categories?: string, source?: string, type: string, count?: boolean, sorts?: string, metadata?: string
}): Promise<ISearchResult> {
    return getData<ISearchResult>(`${settings.api.search}/search`, { params })
}

export const getSubscriptions = (): Promise<ISubscription[]> => {
    return getData<ISubscription[]>(`${settings.api.search}/subscriptions`);
}

export const createSubscription = (subscription: ISubscriptionCreate): Promise<ISubscription> => {
    return postData<ISubscription>(`${settings.api.search}/subscriptions`, subscription);
}
export const updateSubscription = (id:string, updates: Partial<ISubscription>): Promise<ISubscription> => {
    return patchData<ISubscription>(`${settings.api.search}/subscriptions/${id}`, updates);
}

export const deleteSubscription = (subscription: ISubscription): Promise<void> => {
    return deleteData<void>(`${settings.api.search}/subscriptions/${subscription.id}`);
}


export const getMetadatas = (): Promise<IMetadata[]> => {
    return getData<IMetadata[]>(`${settings.api.search}/metadatas`);
}