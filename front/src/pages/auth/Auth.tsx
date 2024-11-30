import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthenticationStates } from "../../types/enums/Authentication-states";
import { Button, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import {
  authenticate as auth,
  register as registerFromService,
} from "../../services/user/user.service";
import { SocketContext } from "../../stores/context/SocketContext";
import webSocketService from "../../services/websocket/websocket.service";

export default function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [pwd, setpwd] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const sharedSocket = useContext(SocketContext);

  async function authenticate() {
    try {
      setIsLoading(true);
      const userId = await auth(username, pwd);

      // Stockage des informations de session
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("isConnected", "true");
      sessionStorage.setItem("userId", userId);

      // Mise à jour du state Redux
      dispatch({
        type: AuthenticationStates.UPDATE_AUTHENTICATION_STATE,
        payload: { isAuth: true, username: username, userId: userId },
      });

      // Connexion WebSocket
      const socket = webSocketService.connect(userId);
      sharedSocket.setSharedSocket(socket);

      // Navigation vers la page principale
      navigate("/");
    } catch (error) {
      console.error("Erreur d'authentification:", error);
      // Vous pourriez ajouter une notification d'erreur ici
    } finally {
      setIsLoading(false);
    }
  }

  async function register() {
    try {
      setIsLoading(true);
      const result = await registerFromService(username, pwd);
      console.info(result);
      // Vous pourriez ajouter une notification de succès ici
    } catch (error) {
      console.error("Erreur d'enregistrement:", error);
      // Vous pourriez ajouter une notification d'erreur ici
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="dashboard-container">
      <h3 className="title">Please register</h3>
      <Form>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            disabled={isLoading}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={pwd}
            onChange={(e) => setpwd(e.target.value)}
            placeholder="Enter your password"
            disabled={isLoading}
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button
            onClick={authenticate}
            disabled={isLoading || !username || !pwd}
          >
            {isLoading ? "Loading..." : "Authenticate!"}
          </Button>
          <Button
            onClick={register}
            disabled={isLoading || !username || !pwd}
            variant="secondary"
          >
            {isLoading ? "Loading..." : "Register"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
