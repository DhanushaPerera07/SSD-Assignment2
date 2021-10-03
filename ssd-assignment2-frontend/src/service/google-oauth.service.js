/*
@author : Dhanusha Perera
@date : 29/09/2021
*/

/** GET user profile details. */
const getUserProfileDetails = (gapi) => {
    // Make API request
    let request = gapi.client.drive.about.get({'fields': 'user'});

    // Execute the API request.
    request.execute(function (response) {
        // currentUser = response.user;
        console.log(response);
    });
};

/** Upload file to google drive. */
const uploadToGoogleDrive = (gapi, fileData) => {
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
const createCalendarEventOnGoogleCalendar = (gapi, calendarEventData, callback) => {
    console.log('execute create calender event on google calender!');

    let request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': calendarEventData
    });

    request.execute((event) => callback(event));
};

export {
    getUserProfileDetails,
    uploadToGoogleDrive,
    createCalendarEventOnGoogleCalendar
};
