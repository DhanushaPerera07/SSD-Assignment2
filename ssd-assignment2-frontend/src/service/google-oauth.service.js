/*
@author : Dhanusha Perera
@date : 29/09/2021
*/
import appConfig from '../conf/google_api_credentials.json';

let gapi = window.gapi;
let GoogleAuth;
let isAuthorized;
let currentApiRequest;
let currentUser;

/** Initialize gapi */
const initialize = () => {
    console.log('initializing google oauth !');
    gapi.load('client:auth2', () => {
        initGapiClient();
        GoogleAuth = gapi.auth2.getAuthInstance();
        GoogleAuth?.isSignedIn.listen(updateSigningStatus);
        setSigningStatus();
    });
};

/** Initializes the JavaScript client with API key, OAuth client ID, scope, and API discovery document(s). */
const initGapiClient = () => {
    gapi.client.init({
        apiKey: appConfig.web.apiKey,
        clientId: appConfig.web.client_id,
        discoveryDocs: appConfig.web.discoveryDocs,
        scope: appConfig.web.scopes
    });
};

/* Update the signing status of the user. */
const updateSigningStatus = (isSignedIn) => {
    console.log('updateSigningStatus works!');
    if (isSignedIn) {
        isAuthorized = true;
        if (currentApiRequest) {
            currentUser = GoogleAuth.currentUser.get();
            // sendAuthorizedApiRequest(currentApiRequest);
        }
    } else {
        isAuthorized = false;
    }
    console.log(`updateSigningStatus method----> isAuthorized: ${isAuthorized}`);
};

function sendAuthorizedApiRequest(requestDetails) {
    console.log('works');
    currentApiRequest = requestDetails;
    if (isAuthorized) {
        // Make API request
        let request = gapi.client.drive.about.get({'fields': 'user'});

        console.log(gapi.client.drive.files);

        // Execute the API request.
        request.execute(function(response) {
            // currentUser = response.user;
            console.log(response);
        });

        // Use gapi.client.request(args) function
        // let request = gapi.client.request({
        //     'method': 'POST',
        //     'path': '/drive/v3/files',
        //     'params': {'uploadType': 'multipart'},
        //     'body': 'Hellow I am Batman'
        // });
        // // Execute the API request.
        // request.execute(function (response) {
        //     console.log(response);
        // });

        // let request = gapi.client.request({
        //     'method': 'GET',
        //     'path': '/drive/v3/about',
        //     'params': {'fields': 'user'}
        // });
        // // Execute the API request.
        // request.execute(function (response) {
        //     console.log(response);
        // });

        // Reset currentApiRequest variable.
        currentApiRequest = {};
    } else {
        GoogleAuth.signIn();
    }
}


function setSigningStatus() {
    let user = GoogleAuth.currentUser.get();
    let isAuthorized = user.hasGrantedScopes(appConfig.web.scopes);
    if (isAuthorized) {
        console.log('User is authorized!');
    } else {
        console.log('User is NOT authorized!');
    }
}

/** GET user profile details. */
const getUserProfileDetails = () => {
    // Make API request
    let request = gapi.client.drive.about.get({'fields': 'user'});

    // Execute the API request.
    request.execute(function(response) {
        // currentUser = response.user;
        console.log(response);
    });
}

export {
    gapi,
    GoogleAuth,
    currentUser,
    isAuthorized,
    initialize,
    getUserProfileDetails
};
