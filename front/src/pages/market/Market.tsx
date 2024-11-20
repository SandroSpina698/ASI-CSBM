import {Card} from "../../types/interfaces/Card";
import {useAuthGuard} from "../auth/AuthGuard.ts";
import CSMBCards from "../../components/cards/CSMBCards.tsx";
import {CardTypeEnum} from "../../types/enums/CardTypeEnum.ts";
import {useEffect, useState} from "react";
import "./Market.css"
import {getAllCardsInTheMarket} from "../../services/cards/market.ts";

export default function Market() {
    useEffect(() => {
        fetchAllUserCards();
    }, [])

    const [currentUserCards, setCurrentUserCards] = useState<Card[]>([]);

    const isAuth = sessionStorage.getItem("isConnected") === 'true' ? sessionStorage.getItem("isConnected") : 'false';

    function fetchAllUserCards(): void {
        getAllCardsInTheMarket().then(result => {
            result ? console.error("resultat vide lors du fetch") : setCurrentUserCards(result);
        })
    }

    useAuthGuard(isAuth);

    return (
        <div className={"market-container"}>
            {currentUserCards.length !== 0 ? (
                currentUserCards.map(e => <CSMBCards key={e.id} card={e} type={CardTypeEnum.STOCK} />)
            ) : (
                <div style={{ width: "100%", textAlign: 'center'}}>Aucune carte</div>
            )}
        </div>
    )
}