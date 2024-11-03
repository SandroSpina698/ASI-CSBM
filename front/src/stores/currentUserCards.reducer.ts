import { Card } from "../types/interfaces/Card";
import {UserCardsStates} from "../types/enums/UserCardsStates.ts";

interface Action {
    type: string;
    payload?: Card[];
}

export const currentUserCardsReducer = (state: Card[] = [], action: Action): Card[] => {
    switch (action.type) {
        case UserCardsStates.UPDATE_USER_CARDS:
            return action.payload ? [...action.payload] : state;
        default:
            return state;
    }
}