import {useAuthGuard} from "../auth/AuthGuard.ts";
import {useDispatch, useSelector} from "react-redux";
import CSMBCards from "../../components/cards/CSMBCards.tsx";
import "./Stock.css";
import {CardTypeEnum} from "../../types/enums/CardTypeEnum.ts";
import {getAllCardsInTheStock} from "../../services/cards/stock.ts";
export default function Stock() {
    const currentCards = useSelector(
        (state) => state.currentUserCardsReducer
    );

    const isAuth = sessionStorage.getItem("isConnected") === 'true' ? sessionStorage.getItem("isConnected") : 'false';

    const dispatch = useDispatch();
    const userId = sessionStorage.getItem("userId") ? sessionStorage.getItem("userId") : "None";

    function setCardsInStore(cards: Card[]) {
        dispatch({
            type: UserCardsStates.UPDATE_USER_CARDS,
            payload: cards
        })
    }

    function fetchAllCurentUserCards() {
        getAllCardsInTheStock(userId).then(result =>{
            console.log(result)
            setCardsInStore(result)
        });

    }

    useEffect(() => {
        fetchAllCurentUserCards()
    }, [])

    useAuthGuard(isAuth);

    return (
        <div className={"stock-container"}>
            {currentCards.length !== 0 ? (
                currentCards.map(e => <CSMBCards key={e.id} card={e} type={CardTypeEnum.STOCK} />)
            ) : (
                <div style={{ width: "100%", textAlign: 'center'}}>Aucune carte</div>
            )}
        </div>
    );
}
import {useEffect} from "react";
import {Card} from "../../types/interfaces/Card";

import {UserCardsStates} from "../../types/enums/UserCardsStates.ts";
