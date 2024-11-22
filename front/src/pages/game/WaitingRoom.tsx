import {useAuthGuard} from "../auth/AuthGuard.ts";
import "./WaitingRoom.css";
import CSMBCards from "../../components/cards/CSMBCards.tsx";
import {CardTypeEnum} from "../../types/enums/CardTypeEnum.ts";
import {useDispatch, useSelector} from "react-redux";
import {Card} from "../../types/interfaces/Card";
import {UserCardsStates} from "../../types/enums/UserCardsStates.ts";
import {useEffect} from "react";
import {getAllCardsFromUser} from "../../services/game/game.ts";
import {getAllCardsInTheStock} from "../../services/cards/stock.ts";

export default function WaitingRoom(){
    const userId = sessionStorage.getItem("userId") ? sessionStorage.getItem("userId") : "None";
    const isAuth : string = sessionStorage.getItem("isConnected") === 'true' ? 'true' : 'false';
    const dispatch = useDispatch();

    const userCards = useSelector(
        (state) => state.currentUserCardsReducer
    )

    function setCardsInStore(cards: Card[]) {
        dispatch({
            type: UserCardsStates.UPDATE_USER_CARDS,
            payload: cards
        })
    }

    function fetchAllCurentUserCards() {
        getAllCardsInTheStock(userId).then(result => setCardsInStore(result));
    }

    useEffect(() => {
        fetchAllCurentUserCards()
    }, []);

    useAuthGuard(isAuth);
    return (
        <div>
            <button className="button-join">Play game</button>
            <div className={"card-container"}>
                {
                    userCards.map(e => <CSMBCards card={e} type={CardTypeEnum.GAME}/>)
                }
            </div>
        </div>
    );
}