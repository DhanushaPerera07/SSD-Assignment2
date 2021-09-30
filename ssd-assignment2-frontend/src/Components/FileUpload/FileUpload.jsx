/*
@author : Dhanusha Perera
@date : 29/09/2021
*/
import React, {Component} from 'react';
import {Button, Container, Form} from 'react-bootstrap';
import {AuthContext} from '../../context/auth.context';

class FileUpload extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            uploadFiles: null
        };
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

    /** upload the file, triggers on upload button. */
    uploadGeneratedFileToGoogleDrive(){
        console.log('let\'s upload the file to Google Drive!');
        /* upload the file to the google drive. */
        this.context.uploadFileToGoogleDrive(this.state.uploadFiles);
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
                        padding: '4rem 0'
                    }}>
                        <Button variant="primary" type="button" onClick={
                        (event) => this.uploadGeneratedFileToGoogleDrive(event)
                    }>Upload To Google Drive</Button>
                    </Container>
                </Form>
            </Container>
        );
    }
}

export default FileUpload;
