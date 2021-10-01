import React, { Component } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { AuthContext } from '../../context/auth.context';

export default class ChannelingForm extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this._onStartDateChange = this._onStartDateChange.bind(this);
        this._onEndDateChange = this._onEndDateChange.bind(this);
        this.state = {
            summary: '',
            location: '',
            description: '',
            startDateTime: '',
            endDateTime: '',
            timeZone: '',
            email: '',
            doctorName: ''
        }
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    _onStartDateChange(e) {
        let state = this.state;
        state['startDateTime'] = e.target.value;
        this.setState(state);
    }

    _onEndDateChange(e) {
        let state = this.state;
        state['startDateTime'] = e.target.value;
        this.setState(state);
    }

    handleClick() {
        var gapi = window.gapi
        var CLIENT_ID = "685011427244-5rn6dm5o8c5r416hk4e4d5dtof5h543o.apps.googleusercontent.com"
        var API_KEY = "AIzaSyA1kTZihvKXk_xVCIPUxDAIK8br4JNNlqg"
        var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
        var SCOPE = "https://www.googleapis.com/auth/calendar.events"

        gapi.load('client:auth2', () => {
            console.log('loaded client')

            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPE,
            })

            gapi.client.load('calender', 'v3', () => console.log('bam!'))

            gapi.auth2.getAuthInstance().signIn()
                .then(() => {
                    var event = {
                        'summary': this.state.summary,
                        'location': this.state.location,
                        'description': this.state.description,
                        'start': {
                            'dateTime': '2021-09-29T09:00:00-07:00',
                            'timeZone': 'America/Los_Angeles'
                        },
                        'end': {
                            'dateTime': '2021-09-30T17:00:00-07:00',
                            'timeZone': 'America/Los_Angeles'
                        },
                        'recurrence': [
                            'RRULE:FREQ=DAILY;COUNT=2'
                        ],
                        'attendees': [
                            { 'email': 'menuradewalegama@gmail.com' },
                            { 'email': 'sachinthazoysa@gmail.com' },
                            { 'email': this.state.email }
                        ],
                        'reminders': {
                            'useDefault': false,
                            'overrides': [
                                { 'method': 'email', 'minutes': 24 * 60 },
                                { 'method': 'popup', 'minutes': 10 }
                            ]
                        }
                    }

                    var request = gapi.client.calendar.events.insert({
                        'calendarId': 'primary',
                        'resource': event
                    });

                    request.execute(event => {
                        window.open(event.htmlLink)
                    })
                })
        })
    }



    render() {

        return (
            <div>
                <h1 style={{ marginTop: '5%', textAlign: 'center' }}>Enter patient's details</h1>
                <hr></hr>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <Card className="container" style={{ marginBottom: '10%' }}>
                            <br />
                            <Form >
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control type="text" name="summary" placeholder="Enter Summary" value={this.state.summary} onChange={this.onChange} />
                                </Form.Group>
                                <Form.Group controlId="formBasicDelivery">
                                    <Form.Label >Select a Hospital</Form.Label> <br></br>
                                    <Form.Control name="doctorName" as="select"
                                        custom className="form-control" value={this.state.doctorName} onChange={this.onChange}
                                    >
                                        <option value="Select">Select a Hospital</option>
                                        <option value="janakachinthana1@gmail.com">Asiri Hospital</option>
                                        <option value="janakachinthana1@gmail.com">Lanka Hospital</option>
                                    </Form.Control>
                                </Form.Group>
                                <br></br>
                                <Form.Group className="mb-3" controlId="formBasicAge">
                                    <Form.Label>description</Form.Label>
                                    <Form.Control type="text" name="description" placeholder="Enter description" value={this.state.description} onChange={this.onChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicAge">
                                    <Form.Label>Time from</Form.Label>
                                    <Form.Control type="datetime-local" name="startDatetime" ref={(startDateTime) => { this.dateRef = startDateTime; }} value={this.state.startDateTime} onChange={this._onStartDateChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicAge">
                                    <Form.Label>Time to</Form.Label>
                                    <Form.Control type="datetime-local" name="endDatetime" ref={(endDatetime) => { this.dateRef = endDatetime; }} value={this.state.endDatetime} onChange={this._onEndDateChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicAge">
                                    <Form.Label>Patient Email</Form.Label>
                                    <Form.Control type="email" name="email" placeholder="Enter email" value={this.state.email} onChange={this.onChange} />
                                </Form.Group>
                                <Form.Group controlId="formBasicDelivery">
                                    <Form.Label >Select a Doctor</Form.Label> <br></br>
                                    <Form.Control name="doctorName" as="select"
                                        custom className="form-control" value={this.state.doctorName} onChange={this.onChange}
                                    >
                                        <option value="Select">Select a Doctor</option>

                                        <option value="janakachinthana1@gmail.com">Dr. Janaka Dissanayake</option>
                                        <option value="Menura">Dr. Menura Dewalegama</option>
                                        <option value="Danusha">Dr. Danusha Perera</option>
                                        <option value="Sachintha">Dr. Sachintha de Zoysa</option>
                                    </Form.Control>
                                </Form.Group>
                                <br></br>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Insert an image of your payment slip</Form.Label><br></br>
                                    <Form.Control type="file" />
                                </Form.Group>
                                <div className="row">
                                    <Button variant="primary" onClick={this.handleClick}>
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                            <br />
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}





