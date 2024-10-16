import {DashboardProps} from "../../types/interfaces/DashboardProps";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const useAuthGuard = (props: DashboardProps) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!props.isAuth) {
            navigate("/auth");
        }
    }, [props.isAuth]);
}