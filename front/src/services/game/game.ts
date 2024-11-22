import {BASE_URL, SERVER_GAME_URL} from "../../types/CommonConstants.ts";
import {Card} from "../../types/interfaces/Card";

export const joinQueue = async (userId : number) => {
    let body = {
        id : userId
    }

    return fetch(`${SERVER_GAME_URL}matchmaking/join`, {
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
    })
}

export const getAllCardsFromUser = (user_id: string): Promise<void | Card[]> => {
    console.log("Getting card from user_id: "+user_id);
    return fetch(`${BASE_URL}/cards`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response);
            return response.json();
        }).then(cards => {
                cards.filter((card: any) => card.userId === user_id)
            }
        );
}