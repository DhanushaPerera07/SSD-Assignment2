/*
@author : Dhanusha Perera
@date : 30/09/2021
*/
import React, {Component} from 'react';
import {Col, Container, Image, Row} from 'react-bootstrap';


class Report extends Component {

    constructor(props) {
        super(props);
        this.state = {
            paySlipImage: this.props.uploadFiles
        };
    }

    componentDidMount() {
        console.log('report componentDidMount works!');
        console.log(this.props?.uploadFiles);
    }

    render() {
        return (
            <Container id={'report_component'}>
                <Row className={'pb-4'}>
                    <Col>
                        <h4>Invoice</h4>
                    </Col>
                    <Col>
                        Date: {new Date(Date.now()).toUTCString()}
                    </Col>
                </Row>

                {/* patient details. */}
                <Container className={'p-0 pb-4'}>
                    <Row>
                        <h5>Patient Details</h5>
                        <hr/>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <h6>Patient Name</h6>
                        </Col>
                        <Col md={8}>
                            <p>Kusal Perera</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <h6>Contect No</h6>
                        </Col>
                        <Col md={8}>
                            <p>077-1234567</p>
                        </Col>
                    </Row></Container>

                {/* channeling and doctor details. */}
                <Container className={'p-0 pb-4'}>
                    <Row>
                        <h5>Channeling Details</h5>
                        <hr/>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <h6>Doctor's Name</h6>
                        </Col>
                        <Col md={8}>
                            <p>Dr. Achala Balasooriya</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <h6>Speciality</h6>
                        </Col>
                        <Col md={8}>
                            <p>Physician</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <h6>Booked date:</h6>
                        </Col>
                        <Col md={8}>
                            <p>{new Date(Date.now()).toUTCString()}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <h6>Booked venue:</h6>
                        </Col>
                        <Col md={8}>
                            <p>Nawaloka Hospitals, Negombo</p>
                        </Col>
                    </Row>
                </Container>

                {/* payment details. */}
                <Container className={'p-0 pb-4'}>
                    <Row>
                        <h5>Payment Details</h5>
                        <hr/>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <h6>Payment</h6>
                        </Col>
                        <Col md={8}>
                            <p>LKR 3500</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <h6>Pay Slip</h6>
                        </Col>
                        {(this.props.uploadFiles) ? (
                            <Col sm={12}>
                                <Image id={'payslip_image'} style={
                                    {
                                        maxWidth: '100%'
                                    }
                                } src={URL.createObjectURL(this.props.uploadFiles)}
                                       alt={'Pay slip should be uploaded'}/></Col>
                        ) : (<Col>
                            <p>No Payment Done</p>
                        </Col>)}

                    </Row>

                </Container>
            </Container>
        );
    }
}

export default Report;
