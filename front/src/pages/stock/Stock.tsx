import {useAuthGuard} from "../auth/AuthGuard.ts";
import {useSelector} from "react-redux";
import {Card} from "../../types/interfaces/Card";
import CSMBCards from "../../components/cards/CSMBCards.tsx";
import "./Stock.css";
import {CardTypeEnum} from "../../types/enums/CardTypeEnum.ts";
import {useEffect, useState} from "react";
import {getAllCardsInTheStock} from "../../services/cards/stock.ts";
import {SSE_TOPIC} from "../../types/CommonConstants.ts";

export default function Stock() {
    useEffect(() => {
        fetchAllCurentUserCards();
    }, [])

    const [currentUserCards, setCurrentUserCards] = useState<Card[]>([]);

    const isAuth = useSelector(
        (state) => state.authenticationReducer.isAuth
    );

    const eventSource = new EventSource(SSE_TOPIC);

    eventSource.onmessage = function (event) {
        fetchAllCurentUserCards();
    }

    eventSource.onerror = function (event) {
        console.error("Erreur sse");
    }

    function fetchAllCurentUserCards(): void {
        getAllCardsInTheStock().then(result => setCurrentUserCards(result));
    }

    useAuthGuard(isAuth);

    return (
        <div className={"stock-container"}>
            {
                currentUserCards.map(e => <CSMBCards card={e} type={CardTypeEnum.STOCK}/>)
            }
        </div>
    )
}