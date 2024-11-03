import {useAuthGuard} from "../auth/AuthGuard.ts";
import {useSelector} from "react-redux";
import CSMBCards from "../../components/cards/CSMBCards.tsx";
import "./Stock.css";
import {CardTypeEnum} from "../../types/enums/CardTypeEnum.ts";

export default function Stock() {
    const currentCards = useSelector(
        (state) => state.currentUserCardsReducer
    );

    const isAuth = useSelector(
        (state) => state.authenticationReducer.isAuth
    );

    useAuthGuard(isAuth);

    return (
        <div className={"stock-container"}>
            {
                currentCards.map(e => <CSMBCards card={e} type={CardTypeEnum.STOCK}/>)
            }
        </div>
    )
}