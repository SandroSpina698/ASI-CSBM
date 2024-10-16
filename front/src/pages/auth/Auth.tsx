import {useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {AuthenticationStates} from "../../types/enums/Authentication-states.ts";

export default function Auth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function authenticate() {
        dispatch({
            type: AuthenticationStates.UPDATE_AUTHENTICATION_STATE,
            payload: true
        });

        navigate("/");
    }

    return (
        <>
            Auth works!
            <button onClick={authenticate}>authenticate!</button>
        </>
    )
}