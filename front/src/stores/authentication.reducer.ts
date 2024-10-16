import {AuthProps} from "../types/interfaces/AuthProps";
import {AuthenticationStates} from "../types/enums/Authentication-states.ts";

export const authenticationReducer = (state: AuthProps = {isAuth: false}, action) => {
    switch (action.type) {
        case AuthenticationStates.UPDATE_AUTHENTICATION_STATE:
            return {
                ...state,
                isAuth: action.payload
            };
        default:
            return state;
    }
}