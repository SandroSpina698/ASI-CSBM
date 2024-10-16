import {DashboardProps} from "../types/interfaces/DashboardProps";

export const authenticationReducer = (state: DashboardProps = {isAuth: false}, action) => {
    switch (action.type) {
        case 'UPDATE_AUTHENTICATION_STATE':
            return {
                ...state,
                isAuth: action.payload
            };
        default:
            return state;
    }
}