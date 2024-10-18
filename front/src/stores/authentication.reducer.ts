import {AuthProps} from "../types/interfaces/props/AuthProps";
import {AuthenticationStates} from "../types/enums/Authentication-states.ts";

export const authenticationReducer = (state: AuthProps = { isAuth: false, userId: -1, username: ''}, action) => {
    switch (action.type) {
        case AuthenticationStates.UPDATE_AUTHENTICATION_STATE:
            return {
                ...state,
                isAuth: action.payload.isAuth,
                userId: action.payload.userId,
                username: action.payload.username
            };
        default:
            return state;
    }
}