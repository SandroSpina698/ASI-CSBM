import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const useAuthGuard = (isAuth: boolean) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate("/auth");
        }
    }, [isAuth]);
}