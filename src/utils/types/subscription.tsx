import { ASSET_TYPE, SOURCE_TYPE } from "./assets";
import { ICatalogMapCoords, ICatalogMapCoordsDict } from "./search";

export type ISubscribe = {
    name: string;
    // despUserId: string;
    query: {
        documentType: ASSET_TYPE;
        documentSource: SOURCE_TYPE|undefined;
        documentCategory: string[];
        metadatas: Record<string, any>;
        geo_bounding_box?: ICatalogMapCoordsDict
        text: string;
    }
}
export type ISubscriptionCreate = {
    name: string;
    despUserId: string;
    query: {
        documentType: ASSET_TYPE;
        documentSource: SOURCE_TYPE|undefined;
        documentCategory: string[];
        metadatas: Record<string, any>;
        geo_bounding_box?: ICatalogMapCoordsDict
        text: string;
    }
}
export type ISubscription = ISubscriptionCreate & {
    id: string;
    despUserId: string;
    created_at: string;
}
