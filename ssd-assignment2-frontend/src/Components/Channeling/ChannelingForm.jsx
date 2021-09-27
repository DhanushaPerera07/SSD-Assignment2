import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';

export default class ChannelingForm extends React.Component {
    render() {
        var gapi = window.gapi
        var CLIENT_ID = "685011427244-5rn6dm5o8c5r416hk4e4d5dtof5h543o.apps.googleusercontent.com"
        var API_KEY = "AIzaSyA1kTZihvKXk_xVCIPUxDAIK8br4JNNlqg"
        var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
        var SCOPE = "https://www.googleapis.com/auth/calendar.events"

        const handleClick = () =>{
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
                .then(() =>{
                    var event = {
                        'summary': 'SLIIT_SSD 2021 - Code4Technology',
                        'location': 'Main Auditorium, SLIIT, Malabe',
                        'description': 'A chance to hear more about Google\'s developer products.',
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
                          {'email': 'menuradewalegama@gmail.com'},
                          {'email': 'sachinthazoysa@gmail.com'}
                        ],
                        'reminders': {
                          'useDefault': false,
                          'overrides': [
                            {'method': 'email', 'minutes': 24 * 60},
                            {'method': 'popup', 'minutes': 10}
                          ]
                        }
                      }

                      var request = gapi.client.calendar.events.insert({
                        'calendarId': 'primary',
                        'resource': event
                      });
                      
                      request.execute(event =>{
                          window.open(event.htmlLink)
                      })
                })
            })
        }
        return (
            <div>
                <h1 style={{ marginTop: '5%' }}>Enter patient's details</h1>
                <hr></hr>
                <div className="row"> 
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <Card className="container">
                            <br/>
                        <Form >
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Patient Name</Form.Label>
                        <Form.Control type="name" placeholder="Enter Namel" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicAge">
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="age" placeholder="Enter Age" />
                    </Form.Group>

                    <Form.Group controlId="formBasicDelivery">
                        <Form.Label >Select a Doctor</Form.Label> <br></br>
                        <Form.Control name="doctorName" as="select"
                            custom  className="form-control"
                            >
                            <option value="Select">Select a Doctor</option>

                            <option value="Janaka">Dr. Janaka Dissanayake</option>
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
                             <Button variant="primary" onClick={handleClick}>
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





