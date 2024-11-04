import {useAuthGuard} from "../auth/AuthGuard.ts";

export default function Profile() {
    let username = '';
    let userId = -1;
    let isAuth = 'false';

    isAuth = sessionStorage.getItem("isConnected") === 'true' ? sessionStorage.getItem("isConnected") : 'false';

    username = sessionStorage.getItem("username") ? sessionStorage.getItem("username") : "";

    userId = sessionStorage.getItem("userId") ? Number.parseInt(sessionStorage.getItem("userId")) : -1;

    useAuthGuard(isAuth);

    return (
        <>Page profile, username: {username}; userId: {userId}</>
    )
}