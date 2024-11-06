import { combineReducers } from 'redux';
import { authenticationReducer } from './authentication.reducer.ts';
import {currentUserCardsReducer} from "./currentUserCards.reducer.ts";

const globalReducer = combineReducers({
    authenticationReducer: authenticationReducer,
    currentUserCardsReducer: currentUserCardsReducer
});

export default globalReducer;
