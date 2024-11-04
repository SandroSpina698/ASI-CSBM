import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link, NavLink, useNavigate} from "react-router-dom";
import "./CSMBNavbar.css";

function CMSBNavbar() {
    const navigate = useNavigate();
    function logout() {
        sessionStorage.clear();
        sessionStorage.setItem("isConnected", "false");
        navigate("/");
    }

    return (
        <div className={"navbar-container"}>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Link to="/" className={"brand"}>CMSB</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to={"/"} className={({isActive, isPending}) =>
                                isPending ? "link pending" : isActive ? "link active" : "link"}>Dashboard</NavLink>
                            <NavLink to="stock" className={({isActive, isPending}) =>
                                isPending ? "link pending" : isActive ? "link active" : "link"}>Stock</NavLink>
                            <NavLink to="market" className={({isActive, isPending}) =>
                                isPending ? "link pending" : isActive ? "link active" : "link"}>Market</NavLink>
                            <NavLink to="profile" className={({isActive, isPending}) =>
                                isPending ? "link pending" : isActive ? "link active" : "link"}>Profile</NavLink>
                            <button onClick={logout}>📴</button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default CMSBNavbar;