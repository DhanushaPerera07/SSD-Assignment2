/*
@author : Dhanusha Perera
@date : 29/09/2021
*/
import React, {Component} from 'react';
import {Button, Container, Form} from 'react-bootstrap';
import {AuthContext} from '../../context/auth.context';
import Report from '../Report/Report';

class FileUpload extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            uploadFiles: null
        };
        this.reportComponentRef = React.createRef();
    }

    componentDidMount() {
    }

    /** Listen to the file upload input field. */
    onChangeFileUpload(event) {
        let uploadedFile = event.target.files[0];
        /* set the state. */
        this.setState((prevState) => {
            prevState.uploadFiles = uploadedFile;
            return prevState;
        });
        console.log('--------- onChangeFileUpload executed!');
    }

    /** Upload the file, triggers on upload button. */
    async uploadGeneratedFileToGoogleDrive() {
        if (this.state.uploadFiles) {
            // user did choose an Image file (payslip).
            try {
                const file = await this.createPDF();
                this.context.uploadFileToGoogleDrive(file);
            } catch (e) {
                console.error('Something went wrong when PDF file is generating!', e);
            }
        } else {
            // user did not choose an Image file (payslip).
            console.log('Please upload the payment slip');
        }

    }

    /** Creates the PDF report document.
     * @return Promise: resolves if PDF report generates successfully,
     * otherwise rejects. */
    createPDF() {
        return new Promise(async (resolve, reject) => {
            console.log('create PDF works!');
            let element = document.getElementById('report_component');

            let opt = {
                margin: 1,
                filename: 'myfile.pdf',
                image: {type: 'jpeg', quality: 0.95},
                html2canvas: {scale: 2, useCORS: true},
                jsPDF: {unit: 'in', format: 'a4', orientation: 'portrait'}
            };

            try {
                const blob = await window.html2pdf().set(opt).from(element).outputPdf('blob', 'my-invoice.pdf');
                resolve(blob);
            } catch (e) {
                reject(e);
            }
        });

    }

    render() {
        return (
            <Container style={{
                padding: '2rem 0'
            }}>
                <h4>File Uploading Component works!</h4>
                <Form>
                    <Form.Group controlId="formFile" className="mb-3" style={
                        {
                            display: 'flex',
                            flexDirection: 'column'
                        }
                    }>
                        <Form.Label>Upload your payment slip</Form.Label>
                        <Form.Control type="file"
                                      accept={'image/png,image/jpeg'}
                                      onChange={(event) =>
                                          this.onChangeFileUpload(event)}/>
                    </Form.Group>

                    <Container style={{
                        padding: '4rem 0',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <Button variant="primary" type="button" onClick={
                            (event) =>
                                this.uploadGeneratedFileToGoogleDrive(event)}>Upload To Google Drive</Button>

                        {/*<Button variant="secondary" type="button" onClick={
                            (event) => this.createPDF(event)
                        }>Generate PDF</Button>*/}
                    </Container>
                </Form>

                <Container style={{
                    padding: '2rem 0'
                }}>
                    {(this.state.uploadFiles) ? (
                        <Report patientDetails={''}
                                channelingDetails={''}
                                paymentDetails={''}
                                uploadFiles={this.state.uploadFiles}
                                ref={this.reportComponentRef}/>
                    ) : ('')}

                </Container>
            </Container>
        );
    }
}

export default FileUpload;
