import { combineReducers } from 'redux';
import { authenticationReducer } from './authentication.reducer.ts';

const globalReducer = combineReducers({
    authenticationReducer,
});

export default globalReducer;
