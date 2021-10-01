import React from 'react';
import GoogleLogin from 'react-google-login';
import { AuthContext } from '../../context/auth.context';
import { Button, Form, Card } from 'react-bootstrap';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'


const slideProperties = {
    duration: 2500,
    scale: 0.8,
    arrows: false
}

// const slideImages = [
//     'https://forum.facmedicine.com/data/MetaMirrorCache/332b15b692202b36ce9b0241f6efb722.jpg',
//     'https://www.gericare.in/static/images/services/doctorvist.jpg',
//     'https://www.beaumont.org/images/default-source/primary-care/doctors.jpg?sfvrsn=9571e2e2_0'

// ];

const slideImages = [
    'https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWVkaWNhbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
    'https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWVkaWNhbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
    'https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWVkaWNhbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'
];

export default class Home extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.goToForm = this.goToForm.bind(this);
        this.state = {
            email: null,
            userName: null,
            googleId: null,
            imageUrl: null
        };
    }

    componentDidMount() {
        console.log(this.context.accessToken);
    }

    responseGoogle = (response) => {
        console.log(response);
        console.log(response.profileObj);
        this.setState({ email: response.profileObj.email });
        this.setState({ userName: response.profileObj.name });
        this.setState({ googleId: response.profileObj.googleId });
        this.setState({ imageUrl: response.profileObj.imageUrl });


    };

    goToForm() {
        window.location = '/channeling';
    }

    render() {
        const { email } = this.state;
        const { userName } = this.state;
        const { googleId } = this.state;
        const { imageUrl } = this.state;

        return (
            <div style={{ textAlign: 'center', height: '500px' }}>

                <br />        
                <br />
                <br />


                <h1 style={{ fontFamily: 'cursive' }}>Book your Doctor with E-DOC</h1>

                <hr />
                <div className="row" style={{ marginTop: '10%' }}>

                    <div style={{ backgroundImage: "url('https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg?auto=compress&cs=tinysrgb&w=325&dpr=1')" }} className="col-md-3">
                        <br /><br /><br /><br /><br /><br /><br />

                        <Button style={{ textAlign: 'center', backgroundColor: 'white', color: 'black', fontSize: '20px' }} onClick={this.goToForm} > <b>Book Now !  </b></Button>

                    </div>

                    <div className="col-md-9">


                        <div className="slide-container" style={{ width: 'auto', height: 'auto', marginRight: '5%', marginLeft: '5%' }}>

                            <Slide  {...slideProperties}>
                                <div className="each-slide">
                                    <div style={{ 'backgroundImage': `url(${slideImages[0]})`, width: '100%', height: '10cm', objectFit: "inherit", textAlign: "center" }}>
                                        <br /><br /><br /><br /><br /><br />
                                        <h3 style={{ fontFamily: 'cursive' }}>Step 1</h3>
                                        <h1 style={{ fontFamily: 'cursive' }}>Book your Doctor here</h1>
                                    </div>
                                </div>
                                <div className="each-slide">
                                    <div style={{ 'backgroundImage': `url(${slideImages[1]})`, width: '100%', height: '10cm', objectFit: "inherit", textAlign: "center" }}>
                                        <br /><br /><br /><br /><br /><br />
                                        <h3 style={{ fontFamily: 'cursive' }}>Step 2</h3>
                                        <h1 style={{ fontFamily: 'cursive' }}>Find your bookins on your Google Calendar</h1>
                                    </div>
                                </div>
                                <div className="each-slide">
                                    <div style={{ 'backgroundImage': `url(${slideImages[2]})`, width: '100%', height: '10cm', objectFit: "inherit" }}>
                                        <br /><br /><br /><br /><br /><br />
                                        <h3 style={{ fontFamily: 'cursive' }}>Step 3</h3>
                                        <h1 style={{ fontFamily: 'cursive' }}>Invoice will be added to your Google Drive</h1>
                                    </div>
                                </div>
                            </Slide>
                        </div>

                    </div>
                </div>


            </div>
        );
    }
}

