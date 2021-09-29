/*
@author : Dhanusha Perera
@date : 29/09/2021
*/

import React, {Component} from 'react';

const AuthContext = React.createContext({});

class AuthProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accessToken: 'This is a testing access token'
        };
    }


    render() {
        return (
            <AuthContext.Provider value={{
                accessToken: this.state.accessToken
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
