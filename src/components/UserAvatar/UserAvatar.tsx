import { useSelector } from "react-redux"
import { randomID, useIsUser, userProfileImage } from "../../utils"
import { FWKReduxState } from "../../redux"
import classNames from "classnames"
import { HTMLProps, ReactNode, useEffect, useState } from "react"
import { IUser } from "../../utils/types"


type IProps = {
    user: IUser
    id?: string
    className?: string
    children?: ReactNode
    image?: string
    props?: Partial<HTMLProps<HTMLDivElement>>
}

export const UserAvatar = (props: IProps) =>{
    const { avatarID } = useSelector((state: FWKReduxState)=> state.auth );
    const isUser = useIsUser(props.user)
    const [ imageID, setImageID ] = useState(isUser ? avatarID : randomID());

    useEffect(()=>{
        if(isUser){
            setImageID(avatarID)
        }
        else{
            setImageID(randomID())
        }
    }, [ props.image, avatarID, isUser ])
    
    return <div
        id={props.id}
        className={classNames({ "user-avatar image": true, [props.className || '' ]: true })}
        style={{ backgroundImage: `url(${ props.image || userProfileImage(props.user.username) + `?cache=${imageID}` })` }}
        {...props.props}
    >
        { props.children }
    </div>
}