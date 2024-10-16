import {AuthProps} from "../../types/interfaces/AuthProps";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const useAuthGuard = (isAuth: boolean) => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log(isAuth);

        if (!isAuth) {
            navigate("/auth");
        }
    }, [isAuth]);
}