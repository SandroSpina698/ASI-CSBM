import {useAuthGuard} from "../auth/AuthGuard.ts";
import "./WaitingRoom.css";
import {CardTypeEnum} from "../../types/enums/CardTypeEnum.ts";
import {useDispatch, useSelector} from "react-redux";
import {Card} from "../../types/interfaces/Card";
import {UserCardsStates} from "../../types/enums/UserCardsStates.ts";
import {getAllCardsFromUser, joinQueue} from "../../services/game/game.ts";
import GameCard from "../../components/cards/GameCard.tsx";
import {Button} from "react-bootstrap";
import {registerWebSocket} from "../../services/game/socket-game.ts";
import {addLabelToElementById, disableElementById} from "../../services/dom/dom-manipulator.ts";
import {useEffect, useState} from "react";

export default function WaitingRoom(){

    const userId = sessionStorage.getItem("userId") ? sessionStorage.getItem("userId") : "None";
    const isAuth : string = sessionStorage.getItem("isConnected") === 'true' ? 'true' : 'false';
    const dispatch = useDispatch();


    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketInstance = registerWebSocket(userId);
        setSocket(socketInstance);

        return () => {
            if (socketInstance) {
                socketInstance.disconnect();
            }
        };
    }, [userId]);

    useEffect(() => {
        if (socket) {
            socket.on("game", (data) => {
                if (data.type === "CARD_CHOICE") {
                    fetchAllCurentUserCards();
                    addLabelToElementById("stateGame", "Choose your card to play");
                }
            });
        }
    }, [socket]);

    const [cardToPlay, setCardToPlay] = useState<number[]>([])

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
            setCardsInStore(result)
        });
    }

    function handleClick(){
        joinQueue(userId)
        disableElementById("joinButton");
        addLabelToElementById("stateGame", "Waiting for an opponent !");
    }

    function handleCardSelect(card_id : number) {
        setCardToPlay((prev) => {
            if (!prev.includes(card_id)) {
                console.log(`Card list : ${cardToPlay}`);
                console.log(`Adding card ID: ${card_id}`);
                return [...prev, card_id];
            } else {
                console.log(`Card ID ${card_id} is already selected`);
                return prev;
            }
        });
    }

    useAuthGuard(isAuth);

    return (
        <div style={{display: "column", width: "100%", height: "100%", justifyContent: "center"}}>
            <label id="stateGame"></label>
            <Button onClick={handleClick} id={"joinButton"}>Play game</Button>
            <div className={"card-container"}>
                {
                    userCards.map(e => <GameCard card={e} type={CardTypeEnum.GAME} onCardSelect={handleCardSelect}/>)
                }
            </div>
        </div>
    );
}