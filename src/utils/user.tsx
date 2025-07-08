import { IUser } from "./types/authentication";

export function userIndentifier(user?: IUser){
    return user?.username;
}

export const isUser = (user1: string|IUser|undefined, user2?: string|IUser|undefined) =>{
    return user1 !== undefined && user2 !== undefined &&
        (
            (typeof user1 === 'string' ? user1 : userIndentifier(user1) )
            ===
            (typeof user2 === 'string' ? user2 : userIndentifier(user2) )
        )
}

export const getUserLink = (username: string) => `/profile/${username}`;

// export const useIsUser = () =>{
//     useEffect(()=>{

//     }, [ ])
// }