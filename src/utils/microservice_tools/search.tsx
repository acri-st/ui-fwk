import { ICatalogMapCoords, ICatalogMapCoordsDict } from "../types"

export const formatGeoBoundingBox = (geo: ICatalogMapCoords) => {
    return {
        "top_left": {
            "lat": geo[0][1],
            "lon": geo[0][0]
        },
        "bottom_right": {
            "lat": geo[1][1],
            "lon": geo[1][0]
        }
    }
}

export const formatGeoBoundingBoxToArray = (geo: ICatalogMapCoordsDict): ICatalogMapCoords => [
    [geo.top_left.lon, geo.top_left.lat],
    [geo.bottom_right.lon, geo.bottom_right.lat],
]