import { NavLink } from "react-router-dom";
import { mockProfile } from "../../theme/images"
import { getUserLink } from "../../utils"
import './UserLink.css';
import { useEffect, useState } from "react";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import { IUser } from "../../utils/types";

export type IUserLinkProps = {
    user: IUser
} | {
    username: string
}

export function UserLink(props: IUserLinkProps) {
    const getUserName = () => 'user' in props ? props.user.username : props.username;

    const [username, setUsername] = useState(getUserName())

    useEffect(()=>{
        setUsername(getUserName())
    }, [ (props as any).user, (props as any).username ])

    return <NavLink
        onClick={(ev)=>ev.stopPropagation()}
        className="user-link"
        to={getUserLink(username)}
    >
        <UserAvatar
            user={{ username, id: '', displayName: username }}
            className="user-link-image"
        />
        <div className="user-link-name">
            { username }
        </div>
    </NavLink>
}
