import React, {Component} from 'react';
import {Button, Card, Form} from 'react-bootstrap';
import {AuthContext} from '../../context/auth.context';

export default class ChannelingForm extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this._onStartDateChange = this._onStartDateChange.bind(this);
        this._onEndDateChange = this._onEndDateChange.bind(this);
        this.state = {
            patientName: '',
            subject: '',
            description: '',
            email: '',
            doctorName: 'Dr Janaka Dissanayake',
            contactNo: '',
            location: 'Asiri Hospital',
            startDate: '2021-10-06T09:00:00-07:00',
            endDate: '2021-10-06T17:00:00-07:00',
            timeZone: 'America/Los_Angeles'

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
            this.context.createCalendarEventOnGoogleCalendar(this.createEventData());
            /* Set channeling details to context */
            this.context.setChannelingDetail(this.state);
        }).catch(reason => {
            console.log('Please sign into the application', reason);
        });

    }

    createEventData() {
        // create let event;
        let calendarEvent = {
            'summary': this.state.subject,
            'location': this.state.location,
            'description': this.state.description,
            'start': {
                'dateTime': this.state.startDate,
                'timeZone': this.state.timeZone
            },
            'end': {
                'dateTime': this.state.endDate,
                'timeZone': this.state.timeZone
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
                                    <Form.Label>Patient Name</Form.Label>
                                    <Form.Control type="text" name="patientName" placeholder="Enter patient's name"
                                                  value={this.state.patientName} onChange={this.onChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicSubject">
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control type="text" name="subject" placeholder="Enter Summary"
                                                  value={this.state.subject} onChange={this.onChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicDescription">
                                    <Form.Label>description</Form.Label>
                                    <Form.Control type="text" name="description" placeholder="Enter description"
                                                  value={this.state.description} onChange={this.onChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicContactNo">
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control type="text" name="contactNo" placeholder="Enter contact number"
                                                  value={this.state.contactNo} onChange={this.onChange}/>
                                </Form.Group>
                                <Form.Group controlId="formBasicDoctor">
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





