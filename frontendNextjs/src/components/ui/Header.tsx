"use client";

import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";

function Header() {
    const [theme, setTheme] = useState<string>("light");

    const toggleTheme = () => {
        setTheme(theme === "light" ? "gray" : "light");
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} href="/">
                    CRUD
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} href="/">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} href="/dashboard">
                            Dashboard
                        </Nav.Link>
                        <Nav.Link as={Link} href="/checkbox">
                            CheckBox
                        </Nav.Link>
                        <Nav.Link as={Link} href="/datepicker">
                            Date Picker
                        </Nav.Link>
                        <Nav.Link as={Link} href="/avatarchange">
                            Avatar Change
                        </Nav.Link>
                    </Nav>
                    <div className="ms-auto">
                        <Button variant="primary" onClick={() => toggleTheme()}>
                            {theme === "light" ? "Gray Mode" : "Light Mode"}
                        </Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
