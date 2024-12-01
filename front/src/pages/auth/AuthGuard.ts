import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const useAuthGuard = (isAuth: string) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth !== 'true') {
            navigate("/auth");
        }
    }, [isAuth]);
}