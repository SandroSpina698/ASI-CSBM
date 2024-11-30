import {useAuthGuard} from "../auth/AuthGuard.ts";
import "./WaitingRoom.css";
import {CardTypeEnum} from "../../types/enums/CardTypeEnum.ts";
import {useDispatch, useSelector} from "react-redux";
import {Card} from "../../types/interfaces/Card";
import {UserCardsStates} from "../../types/enums/UserCardsStates.ts";
import {getAllCardsFromUser, joinQueue} from "../../services/game/game.ts";
import GameCard from "../../components/cards/GameCard.tsx";
import {Button} from "react-bootstrap";

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
        getAllCardsFromUser(userId).then(result =>{
            console.log(result)
            setCardsInStore(result)
        });
    }

    function handleClick(){
        joinQueue(userId).then(result => {
            setLabel(result.message);
            fetchAllCurentUserCards();
        })
    }

    function setLabel(label : string) {
        document.getElementById("stateGame").innerHTML = label;
        document.getElementById("joinButton").classList.add("invisible");
    }

    useAuthGuard(isAuth);
    return (
        <div style={{display: "column", width: "100%", height: "100%", justifyContent: "center"}}>
            <label id="stateGame"></label>
            <Button onClick={handleClick} id={"joinButton"}>Play game</Button>
            <div className={"card-container"}>
                {
                    userCards.map(e => <GameCard card={e} type={CardTypeEnum.GAME}/>)
                }
            </div>
        </div>
    );

    /*
    <div className={"card-container"}>
                {
                    userCards.map(e => <GameCard card={e} type={CardTypeEnum.GAME}/>)
                }
            </div>
     */
}