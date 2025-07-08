import { settings } from "../config"
import { getData } from "../connectivity"
import { ASSET_TYPE, ISearchRecommendedResult } from "../types"

/**
 * Method to call the search engine to get the assets matching the given text
 */
export function searchRecommendedAssets(params: {
    q: string, offset?: number, limit?: number, categories?: string, source?: string, type: ASSET_TYPE, count?: boolean, metadata?: string
}): Promise<ISearchRecommendedResult> {
    return getData<ISearchRecommendedResult>(`${settings.api.recommendation}/recommend`, { params })
}

