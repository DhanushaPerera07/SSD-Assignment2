import React, {Component} from 'react';
import {Button, Container, Nav, Navbar} from 'react-bootstrap';
import {AuthContext} from '../../context/auth.context';
import {withRouter} from 'react-router-dom';

class NavigationBar extends Component {

    static contextType = AuthContext;

    Logout() {
        if (this.context.isAuthorized) {
            return (
                <Button variant={'secondary'} onClick={() => {
                    this.context.logOut();
                    this.props.history.push('/');
                }}>Logout</Button>
            );
        } else {
            return ('');
        }
    }

    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand href="/">E-Doc</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                {/* <Nav.Link href="/home">Home</Nav.Link>*/}
                                {/*<Nav.Link href="/channeling">Channeling</Nav.Link>*/}
                                {/*<Nav.Link href="/uploads">File uploads</Nav.Link>*/}
                                {this.Logout()}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default withRouter(NavigationBar);
