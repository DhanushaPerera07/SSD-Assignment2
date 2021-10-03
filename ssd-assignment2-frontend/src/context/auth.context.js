/*
@author : Dhanusha Perera
@date : 29/09/2021
*/

import React, {Component} from 'react';
import {
    createCalendarEventOnGoogleCalendar,
    getUserProfileDetails,
    uploadToGoogleDrive
} from '../service/google-oauth.service';
import appConfig from '../conf/google_api_credentials.json';

const AuthContext = React.createContext({});

class AuthProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accessToken: null,
            gapi: window.gapi,
            GoogleAuth: null,
            isAuthorized: false,
            currentApiRequest: null,
            currentUser: null,
            channelingDetails: null
        };
    }

    componentDidMount() {
        console.log('auth-context works!');

        /* initializing gapi. */
        this.state.gapi.load('client:auth2', () => {
            this._initGapiClient();
            /* Set the GoogleAuth object in the state. */
            this.setState({
                GoogleAuth: this.state.gapi.auth2.getAuthInstance()
            });
            this.state.GoogleAuth?.isSignedIn?.listen(this._updateSigningStatus.bind(this));
            this._setSigningStatus();
        });
    }

    /** Initialize gapi.client */
    _initGapiClient() {
        this.state.gapi.client.init({
            apiKey: appConfig.web.apiKey,
            clientId: appConfig.web.client_id,
            discoveryDocs: appConfig.web.discoveryDocs,
            scope: appConfig.web.scopes
        });
    }

    /** Set access token to the auth context State. */
    _setIsAuthorized(isAuthorized) {
        this.setState({
            isAuthorized: isAuthorized
        });
    }

    /** Set access token to the auth context State. */
    _setAccessToken(token) {
        // console.log('token : ', token);
        this.setState(prevState => {
            prevState.accessToken = token;
            return prevState;
        });
    }

    /** When user sign in with the Google Account,
     * this function will update the Signing Status. */
    _updateSigningStatus(isSignedIn) {
        console.log('updateSigningStatus works!');
        if (isSignedIn) {
            /* set Authorized value TRUE. */
            this._setIsAuthorized(true);

            /* Set token to the State in the context. */
            this._setAccessToken(this.state.gapi.auth.getToken().access_token);
        } else {
            this._setIsAuthorized(false);
        }
        console.log(`updateSigningStatus method----> isAuthorized: ${this.state.isAuthorized}`);
    }

    /** Set signing status by checking the user's authorization status. */
    _setSigningStatus() {
        let user = this.state.GoogleAuth.currentUser.get();
        let isAuthorized = user.hasGrantedScopes(appConfig.web.scopes);
        if (isAuthorized) {
            console.log('User is authorized!');
        } else {
            console.log('User is NOT authorized!');
        }
    }

    /** Retrieves user details on google drive. */
    _getUserProfileDetails() {
        this.state.GoogleAuth.signIn().then(value => {
            getUserProfileDetails();
        }).catch(reason => {
            console.log('User is NOT yet signed in, to get user details!', reason);
        });
    }

    /** Uploads file to google drive. */
    _uploadFileToGoogleDrive(fileData) {
        this.state.GoogleAuth.signIn().then(value => {
            /* Need to pass the gapi as the first parameter. */
            uploadToGoogleDrive(this.state.gapi, fileData);
        }).catch(reason => {
            console.log('You should sign in in order to upload to drive, broh!: ', reason);
        });
    }

    /** Creates an event on google calendar. */
    _createCalendarEventOnGoogleCalendar(calendarEventData, callback) {
        this.state.GoogleAuth.signIn().then(value => {
            /* Need to pass the gapi as the first parameter. */
            createCalendarEventOnGoogleCalendar(this.state.gapi, calendarEventData, callback);
        }).catch(reason => {
            console.log('You should sign in in order to create an calendar event, broh!: ', reason);
        });
    }

    /** Setter for channel details. */
    _setChannelingDetails(channelingDetails) {
        console.log(channelingDetails);
        this.setState(prevState => {
            prevState.channelingDetails = channelingDetails;
            return prevState;
        });
    }

    /** Retrieve Channel Details. */
    _getChannelingDetails() {
        return this.state.channelingDetails;
    }

    /** Log out the user. */
    _logOut(){
        if (this.state.GoogleAuth.isSignedIn.get()){
            this.state.GoogleAuth.signOut();
        }
    }

    render() {
        return (
            <AuthContext.Provider value={{
                accessToken: this.state.accessToken,
                isAuthorized: this.state.isAuthorized,
                GoogleAuth: this.state.GoogleAuth,
                setAccessToken: this._setAccessToken.bind(this),
                getUserProfileDetails: this._getUserProfileDetails.bind(this),
                uploadFileToGoogleDrive: this._uploadFileToGoogleDrive.bind(this),
                createCalendarEventOnGoogleCalendar: this._createCalendarEventOnGoogleCalendar.bind(this),
                setChannelingDetail: this._setChannelingDetails.bind(this),
                getChannelingDetails: this._getChannelingDetails.bind(this),
                logOut: this._logOut.bind(this)
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
