import React, {Component} from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';

export default class NavigationBar extends Component {
    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand href="/">E-Doc</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                {/* <Nav.Link href="/home">Home</Nav.Link>
                                <Nav.Link href="/channeling">Channeling</Nav.Link>
                                <Nav.Link href="/uploads">File uploads</Nav.Link> */}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}
