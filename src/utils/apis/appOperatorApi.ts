import { IVersion } from "../types/appVersion";
import { settings } from "../config";
import { getData } from "../connectivity";


export function getVersions(): Promise<IVersion> {
    return getData(`${settings.api.appOperator}/versions/`)
}