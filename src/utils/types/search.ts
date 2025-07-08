import { IAsset, SOURCE_TYPE } from "./assets";

export interface ISearchResult {
    assets: IAsset[];
    count: number;
}

export interface ISearchRecommendedResult {
    assets: IAsset[]
    count: number
}


export type ICatalogMapCoords = [
    [number, number],
    [number, number]
]

export type ICatalogMapCoordsDict = {
    "top_left": {
        "lat": number
        "lon": number
    }
    "bottom_right": {
        "lat": number
        "lon": number
    }
}

export type ICatalogFilters = {
    search: string
    categories: number[]
    sources: SOURCE_TYPE[]
    // assetOffset: number
    // recommendedAssetOffset: number
    geo: ICatalogMapCoords|undefined // north-west, south-east

    metadata: {
        [key: string]: any        
        // // General
        // license?: string
        // type?: string

        // // Dataset / Course / paper
        // format?: string

        // // Dataset
        // startDate?: string
        // stopDate?: string

        // // Model & Application
        // programming_language?: string

        // // Application & Paper & Course
        // language?: string

        // // Model

        // // Application
        // supported_os?: string
    }

} & {
    [key: string]: any
}