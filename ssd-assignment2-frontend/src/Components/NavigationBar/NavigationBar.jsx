import React from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap';


export default class NavigationBar extends React.Component {

    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand href="/home">E-Doc</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/home">Home</Nav.Link>
                                <Nav.Link href="/channeling">Channeling</Nav.Link>
                                <Nav.Link href="/uploads">File uploads</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}
