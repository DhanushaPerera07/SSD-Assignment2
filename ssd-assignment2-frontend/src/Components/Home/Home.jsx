import React from 'react';
import GoogleLogin from 'react-google-login';
import { AuthContext } from '../../context/auth.context';
import { Button, Form, Card } from 'react-bootstrap';

export default class Home extends React.Component {

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
        console.log(this.context.accessToken);
    }

    responseGoogle = (response) => {
        console.log(response);
        console.log(response.profileObj);
        this.setState({ email: response.profileObj.email });
        this.setState({ userName: response.profileObj.name });
        this.setState({ googleId: response.profileObj.googleId });
        this.setState({ imageUrl: response.profileObj.imageUrl });


    };

    render() {
        const { email } = this.state;
        const { userName } = this.state;
        const { googleId } = this.state;
        const { imageUrl } = this.state;

        return (
            <div>
                <div className="row" style={{ marginTop: '10%' }}>
                    <div className="col-md-4"></div>

                    <div className="col-md-4">

                        <h1 style={{ textAlign: 'center' }}>Book your Doctor</h1>
                        <h2 style={{ textAlign: 'center' }}>Login</h2>
                        <Card className="container" style={{ padding: '10%' }}>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Check me out" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>

                                <hr />
                                <h5 style={{ textAlign: 'center' }}>Login with Google</h5>

                                <div style={{textAlign:'center'}}>

                                    <GoogleLogin
                                        clientId="685011427244-5rn6dm5o8c5r416hk4e4d5dtof5h543o.apps.googleusercontent.com"
                                        buttonText="Login"
                                        onSuccess={this.responseGoogle}
                                        onFailure={this.responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                </div>
                            </Form>
                        </Card>
                    </div>
                </div>


                <h5>{email}</h5>
                <h5>{userName}</h5>
                <h5>{googleId}</h5>
                <h5>{imageUrl}</h5>
                <img src={imageUrl} alt="Italian Trulli"></img>

                <br />
                <br />
                <Button variant={'primary'} onClick={this.context.getUserProfileDetails}>Get Google User Details</Button>
            </div>
        );
    }
}

