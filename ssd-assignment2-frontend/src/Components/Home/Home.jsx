import React from 'react';
import GoogleLogin from 'react-google-login';
import {AuthContext} from '../../context/auth.context';

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
        this.setState({email: response.profileObj.email});
        this.setState({userName: response.profileObj.name});
        this.setState({googleId: response.profileObj.googleId});
        this.setState({imageUrl: response.profileObj.imageUrl});


    };

    render() {
        const {email} = this.state;
        const {userName} = this.state;
        const {googleId} = this.state;
        const {imageUrl} = this.state;

        return (
            <div>
                <h1>Book your Doctor</h1>
                <GoogleLogin
                    clientId="685011427244-5rn6dm5o8c5r416hk4e4d5dtof5h543o.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}

                />
                <h5>{email}</h5>
                <h5>{userName}</h5>
                <h5>{googleId}</h5>
                <h5>{imageUrl}</h5>
                <img src={imageUrl} alt="Italian Trulli"></img>
            </div>
        );
    }
}

