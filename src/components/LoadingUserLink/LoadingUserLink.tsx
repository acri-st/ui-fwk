import './LoadingUserLink.css'

export function LoadingUserLink(props: { imageOnly?: boolean }) {
    return (<div className="loading-user-link loading" >
        <div className="loading-user-link-image" />
        { !props.imageOnly && <div className="loading-user-link-name"/> }
    </div>
)
}

export default LoadingUserLink;