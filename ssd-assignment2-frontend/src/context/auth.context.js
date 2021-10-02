/*
@author : Dhanusha Perera
@date : 29/09/2021
*/

import React, {Component} from 'react';
import {
    createCalendarEventOnGoogleCalendar,
    getUserProfileDetails,
    GoogleAuth,
    initialize,
    isAuthorized,
    uploadToGoogleDrive
} from '../service/google-oauth.service';

const AuthContext = React.createContext({});

class AuthProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accessToken: null
        };
    }

    componentDidMount() {
        console.log('auth-context works!');
        initialize();
    }

    /** retrieve user details on google drive. */
    _getUserProfileDetails() {
        GoogleAuth.signIn().then(value => {
            console.log(value);
            getUserProfileDetails();
            // TODO: find the error
            // this.setState((prevState)=>{
            //     prevState.accessToken = isAuthorized;
            //     return prevState;
            // });
        }).catch(reason => {
            console.log('User is NOT yet signed in, to get user details!', reason);
        });
    }

    /** uploads file to google drive. */
    _uploadFileToGoogleDrive(fileData) {
        GoogleAuth.signIn().then(value => {
            uploadToGoogleDrive(fileData);
        }).catch(reason => {
            console.log('You should sign in in order to upload to drive, broh!: ', reason);
        });
    }

    /** creates an event on google calendar. */
    _createCalendarEventOnGoogleCalendar(calendarEventData) {
        GoogleAuth.signIn().then(value => {
            createCalendarEventOnGoogleCalendar(calendarEventData);
        }).catch(reason => {
            console.log('You should sign in in order to create an calendar event, broh!: ', reason);
        });
    }

    render() {
        return (
            <AuthContext.Provider value={{
                accessToken: this.state.accessToken,
                getUserProfileDetails: this._getUserProfileDetails,
                uploadFileToGoogleDrive: this._uploadFileToGoogleDrive,
                createCalendarEventOnGoogleCalendar: this._createCalendarEventOnGoogleCalendar
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
