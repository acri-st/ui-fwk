import classNames from 'classnames';
import './UserLinkLoading.css';

export function UserLinkLoading(props: { loading1?: boolean }) {
    return <div
        className={classNames({ "user-link-loading": true, "loading-1": props.loading1})}
    >
        <div className="user-link-image-loading"/>
        <div className="user-link-name-loading"/>
    </div>
}
// export default UserLinkLoading;
