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
            paySlipImage: this.props.uploadFiles,
            patientName: '',
            contactNumber: '',
            doctorName: '',
            bookedDate: '',
            bookedVenue: '',
            payment: '3500'
        };
    }

    componentDidMount() {
        console.log('report componentDidMount works!');
        console.log(this.props?.uploadFiles);

        if (!this.props?.patientDetails?.patientName ||
            !this.props?.patientDetails?.contactNumber ||
            !this.props?.channelingDetails?.doctorName ||
            !this.props?.channelingDetails?.bookedDate ||
            !this.props?.channelingDetails?.bookedVenue) {
            console.log('ChannelingForms Props details are empty!');
        }

        this.setState(prevState => {
            prevState.patientName = this.props?.patientDetails?.patientName;
            prevState.contactNumber = this.props?.patientDetails?.contactNumber;
            prevState.doctorName = this.props?.channelingDetails?.doctorName;
            prevState.bookedDate = this.props?.channelingDetails?.bookedDate;
            prevState.bookedVenue = this.props?.channelingDetails?.bookedVenue;

            return prevState;
        });
    }

    render() {
        return (
            <Container id={'report_component'} style={{border: '5px solid #005ea1', backgroundColor: '#aacbe3'}}>
                <Row className={'pb-4'}>
                    <Col>
                        <h4>Invoice</h4>
                    </Col>
                    <Col>
                        Date: {new Date(Date.now()).toLocaleString('en-US')}
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
                            <p>{this.state?.patientName}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <h6>Contect No</h6>
                        </Col>
                        <Col md={8}>
                            <p>{this.state?.contactNumber}</p>
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
                            <p>{this.state?.doctorName}</p>
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
                            <p>{new Date(this.state?.bookedDate).toLocaleString('en-US')}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <h6>Booked venue:</h6>
                        </Col>
                        <Col md={8}>
                            <p>{this.state?.bookedVenue}</p>
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
                            <p>LKR {this.state?.payment}</p>
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
