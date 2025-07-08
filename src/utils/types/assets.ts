import { IRepository } from "./storage";


export type IAssetVersion = {
    version: number
    marker: string
    created_at: string
    latest?: boolean
}
export interface ICreateAsset {
    license?: string;
    name: string;
    owner: string;
    source: SOURCE_TYPE;
    visibility: ASSET_VISIBILITY;
    externalURL?: string;
}
export enum ASSET_TYPE {
    dataset = 'dataset',
    model = 'model',
    application = 'application',
    paper = 'paper',
    course = 'course',
    other = 'other'
}
export type AssetStatus = 'created';
export enum SOURCE_TYPE {
    user = 'user',
    external = 'external',
    datalake = 'datalake'
};

export enum ASSET_VISIBILITY {
    public = 'public',
    private = 'private'
}
export interface ICreateDatasetResponse {
    inserted: number[];
    error?: string;
    code: number;
}

export interface IUpdateDatasetResponse {
    updated: number[];
    error?: string;
    code: number;
}

export enum ASSET_STATUS {
    creation = 'creation',
    validation = 'validation',
    validated = 'validated',
    published = 'published',
    rejected = 'rejected',
    modified = 'modified'
}


// Common to asset and catalog asset
export type IAssetCommon = {
    id: string
    name: string
    source: SOURCE_TYPE
    type: ASSET_TYPE
    categoryId: number
    image?: string
    repository?: IRepository
    metadata?: Partial<IAssetMetadata>

    updated_at?: string

    isLiked?: boolean
    isBookmarked?: boolean

    likes_count?: number
    bookmarks_count?: number
    downloads_count?: number
    views_count?: number

};
export type IAssetMetadata = { [ metadataName: string ]: any }

// Asset fields that are only for owners
export type IAssetOwner = {
    status: ASSET_STATUS
    isPublic: boolean
    despUserId: string
    licenseId: string
};

export type IAsset = IAssetCommon & Partial<IAssetOwner>;

export type IAssetResponse = { public?: IAsset, draft?: IAsset };


export type ILicense = {
    id: string;
    link: string;
    name: string;
}

export type ICategory = {
    id: number;
    name: string;
    description: string;
    type: ASSET_TYPE;
}
export type ICounters = {
    "dataset": number, "model": number, "application": number, "paper": number, "other": number
}


export type IMetadata = {
    id: string
    name: string
    label: string
    section?: string|null
    asset_type?: ASSET_TYPE[]
    required?: boolean
    queryable: boolean
    priority?: number|null
    search_priority?: number|null
} & (
    {
        type: 'select'
        options: IMetadataSelectOptions
    } | {
        type: 'datetime'
        options?: IMetadataDatetimeOptions|null
    } | {
        type: 'integer'
        options?: IMetadataIntegerOptions|null
    } | {
        type: 'text'
        options?: IMetadataTextareaOptions|null
    } | {
        type: 'duration'
        options?: IMetadataDurationOptions|null
    } | {
        type: 'code'
        options?: IMetadataCodeOptions|null
    }
)

export type IMetadataSelectOptions = {
    values: string[]
}
export type IMetadataDatetimeOptions = {
    min?: string
    max?: string
}
export type IMetadataIntegerOptions = {
    min?: number
    max?: number
}
export type IMetadataTextareaOptions = {
}
export type IMetadataDurationOptions = {
    duration_reference: string
}
export type IMetadataCodeOptions = {
    highlight_reference?: string
}
