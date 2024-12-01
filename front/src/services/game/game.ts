import {BASE_URL, SERVER_GAME_URL} from "../../types/CommonConstants.ts";
import {Card} from "../../types/interfaces/Card";
import PlayerAction from "../../model/action/PlayerAction.ts";
import PlayerActionType from "../../model/action/PlayerActionType.ts";

export const joinQueue = (userId : string): Promise<void | string> => {
    const body = {
        userId : userId
    }
    return fetch(`${SERVER_GAME_URL}/games/join`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(message =>{
            return message;
    }).then(gameId => {
        return gameId;
    });
}

export const startCombat = (game_id : string, type : PlayerActionType, user_id : string, cards : number []) => {
    const body = {
        type: type,
        gameId: game_id,
        userId: user_id,
        cardIds: cards
    }

    return fetch(`${SERVER_GAME_URL}/games/${game_id}/action`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log(response.json());
    })
}

export const getAllCardsFromUser = (user_id: string): Promise<Card[]> => {
    console.log("userid : " +user_id)
    return fetch(`${BASE_URL}/cards`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(cards =>{
            return cards.filter((card: any) => card.userId === parseInt(user_id));
        });
};