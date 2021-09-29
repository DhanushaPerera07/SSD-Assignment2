/*
@author : Dhanusha Perera
@date : 29/09/2021
*/

import React, {Component} from 'react';
import {getUserProfileDetails, GoogleAuth, initialize, isAuthorized} from '../service/google-oauth.service';

const AuthContext = React.createContext({});

class AuthProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accessToken: 'This is a testing access token'
        };
    }

    componentDidMount() {
        console.log('auth-context works!');
        initialize();
    }

    _getUserProfileDetails(){
        if (isAuthorized){
            getUserProfileDetails();
        } else {
            GoogleAuth.signIn();
        }
    }

    render() {
        return (
            <AuthContext.Provider value={{
                accessToken: this.state.accessToken,
                getUserProfileDetails: this._getUserProfileDetails
            }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

const AuthConsumer = AuthContext.Consumer;
export {
    AuthContext,
    AuthProvider,
    AuthConsumer
};
