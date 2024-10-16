import {DashboardProps} from "../../types/interfaces/DashboardProps";
import {useAuthGuard} from "../auth/AuthGuard.ts";

export default function Dashboard(props: DashboardProps) {

    useAuthGuard(props);

    return (
        <>Dashboard</>
    )
}