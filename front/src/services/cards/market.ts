import {BASE_URL} from "../../types/CommonConstants.ts";
import {Card} from "../../types/interfaces/Card";

export const getAllCardsInTheMarket = (): Promise<Card[]> => {
    return fetch(`${BASE_URL}/store/cards_to_sell`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
};

export const sellACard = (userId: string, card: Card): Promise<boolean> => {
    if (!isUserOwner(userId, card)) {
        throw new Error("This user is not the card owner!");
    }

    let body  = {
        "user_id": userId,
        "card_id": card.id,
        "store_id": 1
    };

    return fetch(`${BASE_URL}/store/sell`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
    }).then(response => {
        if (!response.ok) {
            throw new Error("Error trying to sell the card")
        }

        return response.json();
    })
}

export const buyACard = (userId: string, card: Card): Promise<boolean> => {
    if (!isUserOwner(userId, card)) {
        throw new Error("This user is not the card owner!");
    }

    let body  = {
        "user_id": userId,
        "card_id": card.id,
        "store_id": 1
    };

    return fetch(`${BASE_URL}/store/buy`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
    }).then(response => {
        if (!response.ok) {
            throw new Error("Error trying to buy the card")
        }

        return response.json();
    })
}

const isUserOwner = (userId: string, card: Card): boolean => {
    if (!card.userId) {
        throw new Error("userId is falsy");
    }

    return card.userId.toString() === userId.trim();
}