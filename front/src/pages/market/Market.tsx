import {Card} from "../../types/interfaces/Card";
import {useSelector} from "react-redux";
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

    const isAuth = useSelector(
        (state) => state.authenticationReducer.isAuth
    );

    function fetchAllUserCards(): void {
        getAllCardsInTheMarket().then(result => {
            result ? console.error("resultat vide lors du fetch") : setCurrentUserCards(result);
        })
    }

    useAuthGuard(isAuth);

    return (
        <div className={"market-container"}>
            {
                currentUserCards.map(e => <CSMBCards card={e} type={CardTypeEnum.STOCK}/>)
            }
        </div>
    )
}