import React, {Component} from 'react';
import {Button, Card, Col, Container, Form, Image, Row} from 'react-bootstrap';
import {FcGoogle} from 'react-icons/fc';
import {AuthContext} from '../../context/auth.context';
import {withRouter} from 'react-router-dom';
import {GoogleAuth} from '../../service/google-oauth.service';

class Login extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            userName: null,
            googleId: null,
            imageUrl: null
        };
    }

    componentDidMount() {
        console.log('login component works!');
        console.log(this.context.accessToken);

        const {match, location, history} = this.props;
        console.log('location works!');
        console.log(location);
    }

    /* Login with Google account. */
    loginWithGoogleAccount() {
        console.log('login with google button clicked!');
        GoogleAuth.signIn().then(value => {
            console.log('Login successfully completed!');
            const {history} = this.props;
            history.push('/channeling');
        }).catch(reason => {
            console.log('You should login with Google account!', reason);
        });
    }

    render() {
        return (
            <Container className={'pb-4'}>
                <Row className={'p-2'}
                     style={{textAlign: 'center', color: 'black'}}>
                    <h1>Book your Doctor</h1>
                    <h4>Login</h4>
                    <hr/>
                </Row>

                <Row className={'p-2'}>
                    <Col sm={12} md={6} style={{
                        minWidth: '450px',
                        maxWidth: '550px'
                    }}>
                        <Image style={{
                            width: '100%',
                        }} src={'https://image.freepik.com/free-vector/online-doctor-concept_23-2148522555.jpg'}/>
                    </Col>

                    <Col sm={12} md={6}>
                        <Card className="container" style={{padding: '10%'}}>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email"/>
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password"/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Check me out"/>
                                </Form.Group>
                                <Button variant="outline-secondary" type="submit">
                                    Submit
                                </Button>

                                <hr/>
                                <Container style={{textAlign: 'center'}}>
                                    <p>Please login with your google account to use our services</p>
                                    <Button variant={'outline-primary'}
                                            onClick={() => this.loginWithGoogleAccount()}>Login with Google <FcGoogle/></Button>
                                </Container>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(Login);
