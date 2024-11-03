import {BASE_URL} from "../../types/CommonConstants.ts";
import {Card} from "../../types/interfaces/Card";

export const getAllCardsInTheStock = (): Promise<Card[]> => {
    return fetch(`${BASE_URL}/cards`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
};
