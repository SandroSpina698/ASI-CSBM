import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link, NavLink} from "react-router-dom";
import "./CSMBNavbar.css";

function CMSBNavbar() {
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
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default CMSBNavbar;