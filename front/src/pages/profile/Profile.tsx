import {useAuthGuard} from "../auth/AuthGuard.ts";
import {useSelector} from "react-redux";

export default function Profile() {
    let username = '';
    let userId = -1;
    let isAuth = false;

    isAuth = useSelector(
        (state) => state.authenticationReducer.isAuth
    )

    username = useSelector(
        (state) => state.authenticationReducer.username
    )

    userId = useSelector(
        (state) => state.authenticationReducer.userId
    )

    useAuthGuard(isAuth);

    return (
        <>Page profile, username: {username}; userId: {userId}</>
    )
}