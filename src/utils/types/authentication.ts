export type IUserRoles = string[];
export type IUser = {
    id: string,
    username: string,
    displayName: string,
    image?: string,
};
export type IProfileResponse = {
    user: IUser
    expiration_date?: number
    roles: IUserRoles
}