import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';

export default class ChannelingForm extends React.Component {
    render() {
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
                             <Button variant="primary" type="submit">
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





