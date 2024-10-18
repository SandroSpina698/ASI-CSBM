import {useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {AuthenticationStates} from "../../types/enums/Authentication-states.ts";
import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import bcrypt from "bcryptjs-react";
import {authenticate as auth, register as registerFromService} from "../../services/user/user.service.ts"
import {Salt} from "../../types/CommonConstants.ts"

export default function Auth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [pwd, setpwd] = useState("");

    function authenticate() {
        let vPassword = bcrypt.hashSync(pwd, Salt);

        auth(username, vPassword).then((response) => {
            dispatch({
                type: AuthenticationStates.UPDATE_AUTHENTICATION_STATE,
                payload: {isAuth: true, username: username, userId: response}
            })
            navigate("/");
        });
    }

    function register() {
        let vPassword = bcrypt.hashSync(pwd, Salt);

        registerFromService(username, vPassword).then((result) => {
            console.info(result);
        });
    }

    return (
        <>
            <div className="dashboard-container">
                <h3 className="title"> Please register </h3>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Username</Form.Label>
                        <Form.Control onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={(e) => setpwd(e.target.value)} type="password" placeholder="Enter your password" />
                    </Form.Group>
                    <Button onClick={authenticate}>Authenticate!</Button>
                    <Button onClick={register}>Register</Button>
                </Form>
            </div>
        </>
    )
}