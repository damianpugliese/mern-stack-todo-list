import React, { useState } from 'react';
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
import { Link } from 'react-router-dom';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar color="primary" dark expand="sm">
            <Container>
                <NavbarBrand href="/tasks" className="text-white">
                    To Do List
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/signin" className="text-light">
                                Sign In
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/signup" className="text-light">
                                Sign Up
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/damianpugliese/todo-list-mern-stack" className="text-light"
                                target="blank"
                            >
                                GitHub
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;