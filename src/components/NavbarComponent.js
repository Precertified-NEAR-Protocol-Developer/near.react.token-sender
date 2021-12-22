import React from 'react'
import '../scss/AppStyles.scss';
import {Navbar, Nav} from 'react-bootstrap';
import 'regenerator-runtime/runtime'
import { login, logout } from '../utils'
import '../global.css'
import { nearWalletConnection } from '../near-wallet-connection';

const isUserLoggedIn = () => {
    const currentAccountId = window.accountId;
    const accountIdIsUndefined = 'undefined' === typeof currentAccountId;
    const accountIdIsEmpty = '' === currentAccountId;
    const accountIdIsNull = null === currentAccountId;
    const isNotLoggedIn = accountIdIsUndefined || accountIdIsEmpty || accountIdIsNull;
    return !isNotLoggedIn;
};

const NavbarComponent = props => {
    return (        
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav>                            
                        <Nav.Link onClick={                            
                            isUserLoggedIn() ?
                            logout :
                            login
                        }>
                            {
                                isUserLoggedIn() ?
                                'Logout' :
                                'Login'
                            }
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
    );
};

export default NavbarComponent;