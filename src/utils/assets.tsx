import { IFormValidation } from "../components/FormFieldValidation/FormFieldValidation";
import { Logger } from "./logger";
import { URLRegex } from "./tools";
import { ASSET_TYPE, IAsset, SOURCE_TYPE } from "./types";
import { IFile } from "./types/storage";

export const assetURL = (asset: IAsset) => `/asset/${asset.id}`;
export const courseURL = (asset: IAsset) => `/course/${asset.id}`;

const logger = new Logger('utils', 'assets')

export const getAssetTypeLabel = (asset: string) => {
    return (asset === 'paper' ? 'document' : `${asset}`) as ASSET_TYPE
}

export const getAssetImage = (asset: IAsset) => asset.image || `/api/storage/thumbnail/${asset.id}`

export const sourceTypes = [
    SOURCE_TYPE.user, SOURCE_TYPE.external,
    // SOURCE_TYPE.datalake
];

export const sourceTypeLabel = (source: SOURCE_TYPE) => {
    switch (source) {
        case SOURCE_TYPE.user: return "User"
        case SOURCE_TYPE.external: return "External"
        case SOURCE_TYPE.datalake: return "DestinE"
    }
}

export const assetIsReady = (asset: IAsset | undefined, files: IFile[] | undefined): boolean => {
    let isReady = !!asset && !!asset.metadata?.description && asset.categoryId !== undefined;
    if (asset && asset.source !== "external") {
        isReady = isReady && !!files && files.length > 0;
    }
    return isReady;
}

export const assetIsPublished = (asset: IAsset | undefined): boolean => {
    // return assetIsReady(asset)
    // return !!(asset && asset.status && [ ASSET_STATUS.published, ASSET_STATUS.modified ].includes(asset.status));
    return !!(asset && asset.isPublic === true);
}

export const ASSET_SOURCES = [
    { value: SOURCE_TYPE.user, label: 'User assets' },
    { value: SOURCE_TYPE.external, label: 'External' },
    // { value: SOURCE_TYPE.datalake, label: 'DestinE' },
]

export const externalURLValidation: IFormValidation[] = [
    { description: 'Must be a valid URL', validation: (externalURL) => URLRegex.test(externalURL) }
]

export const DTEAcknowledgement = "I acknowledge that I understand it is forbidden to disseminate DestinE Primary and Altered Data (DPAD) and agree to comply with all related data handling policies."