import {AuthProps} from "../../types/interfaces/AuthProps";
import {useAuthGuard} from "../auth/AuthGuard.ts";
import {useSelector} from "react-redux";

export default function Profile() {
    const isAuth = useSelector(
        (state) => state.authenticationReducer.isAuth
    );

    useAuthGuard(isAuth);

    return (
        <>test profile</>
    )
}