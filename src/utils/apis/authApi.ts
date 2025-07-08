import { getData } from "../connectivity";
import { IUser } from "../types";
import { settings } from "../config";

/**
 * Method that fetches the user from the auth management and returns their information
 * @param userId the id of the user
 * @returns 
 */
export async function getUserProfile(userId: string){
    return getData<IUser>(`${settings.api.auth}/user/${userId}`);
}