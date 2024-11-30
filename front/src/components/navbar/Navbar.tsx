import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./CSMBNavbar.css";
import { useContext } from "react";
import { SocketContext } from "../../stores/context/SocketContext";
import webSocketService from "../../services/websocket/websocket.service";
import { useDispatch } from "react-redux";
import { AuthenticationStates } from "../../types/enums/Authentication-states";

function CMSBNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socketContext = useContext(SocketContext);

  function logout() {
    const isConnected = sessionStorage.getItem("isConnected") === "true";

    if (!isConnected) {
      return;
    }

    // Nettoyage du sessionStorage
    sessionStorage.clear();
    sessionStorage.setItem("isConnected", "false");

    // Déconnexion du WebSocket
    webSocketService.disconnect();

    // Réinitialisation du context socket
    socketContext.setSharedSocket(null);

    // Mise à jour du state Redux
    dispatch({
      type: AuthenticationStates.UPDATE_AUTHENTICATION_STATE,
      payload: { isAuth: false, username: "", userId: "" },
    });

    // Redirection
    navigate("/auth");
  }

  return (
    <div className="navbar-container">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Link to="/" className="brand">
            CMSB
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isPending ? "link pending" : isActive ? "link active" : "link"
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="stock"
                className={({ isActive, isPending }) =>
                  isPending ? "link pending" : isActive ? "link active" : "link"
                }
              >
                Stock
              </NavLink>
              <NavLink
                to="market"
                className={({ isActive, isPending }) =>
                  isPending ? "link pending" : isActive ? "link active" : "link"
                }
              >
                Market
              </NavLink>
              <NavLink
                to="profile"
                className={({ isActive, isPending }) =>
                  isPending ? "link pending" : isActive ? "link active" : "link"
                }
              >
                Profile
              </NavLink>
              <NavLink
                to="chat"
                className={({ isActive, isPending }) =>
                  isPending ? "link pending" : isActive ? "link active" : "link"
                }
              >
                Chat
              </NavLink>
              <button onClick={logout} className="logout-button" title="Logout">
                📴
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default CMSBNavbar;
