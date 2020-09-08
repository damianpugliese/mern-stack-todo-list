import React, { useState } from 'react';
import './Header.scss';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import logo from '../../../assets/images/logo.png';
import github from '../../../assets/images/github.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/actions/Users/usersActions';

const Header = () => {

    const dispatch = useDispatch();
    const dispatchLogout = () => dispatch(logout());

    const isAuthenticated = useSelector(state => state.users.isAuthenticated);
    const user = useSelector(state => state.users.user);
    const isLoading = useSelector(state => state.users.isLoading);

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        dispatchLogout();
    }

    return (
        <header>
            <Navbar color="primary" dark expand="sm">
                <Container>
                    <NavbarBrand href="/" className="text-white">
                        <img src={logo} alt="logo" className="logo" />
                    Mern To Do List
                </NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {isAuthenticated ?
                                <>
                                    <NavItem>
                                        <span className="navbar-text mr-3">
                                            <strong>
                                                {user ? `Welcome ${user.username}` : ''}
                                            </strong>
                                        </span>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to="/signin" className="text-light" onClick={() => {
                                            handleLogout();
                                            setIsOpen(false);
                                        }}>
                                            Lougout
                                    </NavLink>
                                    </NavItem>
                                </>
                                : !isLoading ?
                                    <>
                                        <NavItem>
                                            <NavLink tag={Link} to="/signin" className="text-light" onClick={() => setIsOpen(false)}>
                                                Sign In
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to="/signup" className="text-light" onClick={() => setIsOpen(false)}>
                                                Sign Up
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="https://github.com/damianpugliese/todo-list-mern-stack" className="text-light"
                                                target="blank"
                                            >
                                                <img src={github} alt="gihub" className="github" />
                                            </NavLink>
                                        </NavItem>
                                    </>
                                :
                                null
                            }
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;