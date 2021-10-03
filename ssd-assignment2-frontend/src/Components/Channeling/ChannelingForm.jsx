import React, {Component} from 'react';
import {Button, Card, Form} from 'react-bootstrap';
import {AuthContext} from '../../context/auth.context';
import {createCalendarEventOnGoogleCalendar} from '../../service/google-oauth.service';

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
        };
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
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
        this.context.GoogleAuth.signIn().then(value => {
            createCalendarEventOnGoogleCalendar(this.createEventData());
        }).catch(reason => {
            console.log('Please sign into the application', reason);
        });

    }

    createEventData() {
        // create let event;
        let calendarEvent = {
            'summary': this.state.summary,
            'location': 'Asiri Hospital',
            'description': this.state.description,
            'start': {
                'dateTime': '2021-10-04T09:00:00-07:00',
                'timeZone': 'America/Los_Angeles'
            },
            'end': {
                'dateTime': '2021-10-04T17:00:00-07:00',
                'timeZone': 'America/Los_Angeles'
            },
            'recurrence': [
                'RRULE:FREQ=DAILY;COUNT=2'
            ],
            'attendees': [
                {'email': this.state.email}
            ],
            'reminders': {
                'useDefault': false,
                'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10}
                ]
            }
        };

        return calendarEvent;
    }


    render() {

        return (
            <div>
                <h1 style={{marginTop: '5%', textAlign: 'center'}}>Enter patient's details</h1>
                <hr></hr>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <Card className="container" style={{marginBottom: '10%'}}>
                            <br/>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control type="text" name="summary" placeholder="Enter Summary"
                                                  value={this.state.summary} onChange={this.onChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicAge">
                                    <Form.Label>description</Form.Label>
                                    <Form.Control type="text" name="description" placeholder="Enter description"
                                                  value={this.state.description} onChange={this.onChange}/>
                                </Form.Group>
                                <Form.Group controlId="formBasicDelivery">
                                    <Form.Label>Select a Doctor</Form.Label> <br></br>
                                    <Form.Control name="email" as="select"
                                                  custom className="form-control" value={this.state.email}
                                                  onChange={this.onChange}
                                    >
                                        <option value="Select">Select a Doctor</option>
                                        <option value="janakachinthana1@gmail.com">Dr. Janaka Dissanayake</option>
                                        <option value="menuradewalegama@gmail.com">Dr. Menura Dewalegama</option>
                                        <option value="Buddhika.Dhanusha@gmail.com">Dr. Danusha Perera</option>
                                        <option value="sachinthazoysa@gmail.com">Dr. Sachintha de Zoysa</option>
                                    </Form.Control>
                                </Form.Group>
                                <br></br>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Insert an image of your payment slip</Form.Label><br></br>
                                    <Form.Control type="file"/>
                                </Form.Group>
                                <div className="row">
                                    <Button variant="primary" onClick={this.handleClick}>
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                            <br/>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}





