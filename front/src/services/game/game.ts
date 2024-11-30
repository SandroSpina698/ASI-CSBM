import {BASE_URL, SERVER_GAME_URL} from "../../types/CommonConstants.ts";
import {Card} from "../../types/interfaces/Card";

export const joinQueue = (userId : string): Promise<void | string> => {
    console.log(userId);
    let body = {
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
    });
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