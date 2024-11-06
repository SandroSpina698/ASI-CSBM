import {useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {AuthenticationStates} from "../../types/enums/Authentication-states.ts";
import {Button, Form} from "react-bootstrap";
import {useContext, useState} from "react";
import {authenticate as auth, register as registerFromService} from "../../services/user/user.service.ts"
import {Socket} from "socket.io-client";
import {connect, sendMessage} from "../../services/websocket/websocket.service.ts";
import {SocketContext} from "../../stores/context/SocketContext.ts";

export default function Auth() {
    const [socket, setSocket] = useState<Socket>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [pwd, setpwd] = useState("");
    let sharedSocket = useContext(SocketContext);

    function authenticate() {
        auth(username, pwd).then((response) => {
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("isConnected", "true");
            sessionStorage.setItem("userId", response);
            dispatch({
                type: AuthenticationStates.UPDATE_AUTHENTICATION_STATE,
                payload: {isAuth: true, username: username, userId: response}
            })

            let tempSocket = connect(response);

            setSocket(tempSocket);

            sharedSocket.setSharedSocket(tempSocket);

            // socket?.on("sendmessage", ({ sender_id, message }) => {
            //     alert(`nouveau message de l'utilisateur ${sender_id}, il dit: ${message}`);
            // })

            // sendMessage(response, "testtest", tempSocket ? tempSocket : connect(response));

            navigate("/");
        });
    }

    function register() {
        registerFromService(username, pwd).then((result) => {
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