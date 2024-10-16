import {AuthProps} from "../../types/interfaces/AuthProps";
import {useAuthGuard} from "../auth/AuthGuard.ts";
import {useSelector} from "react-redux";

export default function Stock() {
    const isAuth = useSelector(
        (state) => state.authenticationReducer.isAuth
    );

    useAuthGuard(isAuth);

    return (
        <>Stock works!</>
    )
}