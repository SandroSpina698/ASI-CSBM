import {BASE_URL} from "../../types/CommonConstants.ts";
import {Card} from "../../types/interfaces/Card";

export const getAllCardsInTheStock = (user_id: string): Promise<Card[]> => {
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
