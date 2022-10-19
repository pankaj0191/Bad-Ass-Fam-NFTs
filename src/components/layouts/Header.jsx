import React, { useContext } from "react";
import { Nav, Navbar, Container, Dropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import Menus from '../../data/menus.json'
import Metamask from "../../context/Metamask";
import { TrimText } from "@/helpers";


function Header() {
    const { useUserStorage, login, logout } = useContext(Metamask.context);
    const [userData, setUserData] = useUserStorage();
    const userAddress = userData.address || "";
    let location = useLocation();

    const connectWallet = async (event) => {
        event.preventDefault();
        await login();
    }

    const disconnectWallet = async (event) => {
        event.preventDefault();
        await logout();
    }

    return (
        <>
            <Navbar expand="lg" className="navigation " fixed="top">
                <Container fluid className="px-5">
                    <Link to="/" className="navbar-brand">Bad Ass Fam</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" ><FaBars /></Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {Menus.length ? Menus.map((menu, key) => {
                                let active = menu.url.includes(location.pathname);
                                return <Nav key={menu.slug}><Link to={menu.href} className={`nav-link${active ? " active" : ""}`}>{menu.name}</Link></Nav>
                            }) : ""}
                        </Nav>
                        {userAddress ? (
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" className="userDropdown">
                                    <img src="/images/user-avatar.png" alt="Image" height="30px" width="30px" className="userImage" /> <span>{TrimText(userAddress, 2)}</span>

                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Link to="/profile" className="dropdown-item">Profile</Link>
                                    <Dropdown.Item href="#" onClick={disconnectWallet}>Log Out</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <button className="connectWallet" onClick={connectWallet}>Connect</button>
                        )}

                    </Navbar.Collapse>

                </Container>
            </Navbar>

        </>

    )

}

export default Header;