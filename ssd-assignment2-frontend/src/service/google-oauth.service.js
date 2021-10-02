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
    request.execute(function (response) {
        // currentUser = response.user;
        console.log(response);
    });
};

/** Upload file to google drive. */
const uploadToGoogleDrive = (fileData) => {
    console.log('execute upload file to google function!');
    console.log('printing uploaded file: ');
    console.log(fileData);

    /* File name can be set here. */
    let metadata = {
        name: `e-doc-channelling-receipt.pdf`
    };

    /* get the access token from the gapi. */
    const accessToken = gapi.auth.getToken().access_token;

    /* make the request formData. */
    let form = new FormData();
    form.append('',
        new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
    form.append('', fileData);

    /* send the POST request. */
    fetch(`${process.env.REACT_APP_GOOGLE_DRIVE_API_V3_CREATE_MULTIPART}`, {
        method: 'POST',
        headers: new Headers({'Authorization': 'Bearer ' + accessToken}),
        body: form,
    }).then((res) => {
        return res.json();
    }).then(function (val) {
        console.log(val);
    });

};

/** Create calender event on google calender. */
const createCalendarEventOnGoogleCalendar = (calendarEventData) => {
    console.log('execute create calender event on google calender!');

    var request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': calendarEventData
    });

    request.execute(event => {
        window.open(event.htmlLink);
    });
};

const getGoogleAuth = () => {
    return new Promise((resolve, reject) => {
        if(GoogleAuth){
            console.log('GoogleAuth should not truthy!');
            resolve(GoogleAuth);
        } else {
            reject(null);
        }
    });
}

export {
    gapi,
    GoogleAuth,
    getGoogleAuth,
    currentUser,
    isAuthorized,
    initialize,
    getUserProfileDetails,
    uploadToGoogleDrive,
    createCalendarEventOnGoogleCalendar
};
