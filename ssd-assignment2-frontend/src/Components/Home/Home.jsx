import React from 'react';
import {AuthContext} from '../../context/auth.context';
import {Button, Col, Container, Row} from 'react-bootstrap';
import {Slide} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import {withRouter} from 'react-router-dom';


const slideProperties = {
    duration: 2500,
    scale: 0.8,
    arrows: false
};

const slideImages = [
    'https://www.wallpaperflare.com/static/88/237/206/heart-minimalism-white-background-simple-background-wallpaper.jpg',
    'https://www.wallpaperflare.com/static/88/237/206/heart-minimalism-white-background-simple-background-wallpaper.jpg',
    'https://www.wallpaperflare.com/static/88/237/206/heart-minimalism-white-background-simple-background-wallpaper.jpg',
    'https://www.wallpaperflare.com/static/88/237/206/heart-minimalism-white-background-simple-background-wallpaper.jpg'
];

class Home extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.goToLogin = this.goToLogin.bind(this);
        this.state = {
            email: null,
            userName: null,
            googleId: null,
            imageUrl: null
        };
    }

    goToLogin() {
        console.log('onclick goToLogin works!');
        const {history} = this.props;

        if (this.context.isAuthorized){
            history.push('/channeling');
        } else {
            history.push('/login');
        }
    }

    render() {
        return (
            <Container className={'pb-4'} style={{textAlign: 'center'}}>
                <br/>
                <h1>Book your Doctor with E-DOC</h1>

                <hr/>
                <Row style={{marginTop: '5%'}}>

                    <Col md={12}>

                        <div className="slide-container"
                             style={{width: 'auto', height: 'auto', marginRight: '5%', marginLeft: '5%'}}>

                            <Slide  {...slideProperties}>
                                <div className="each-slide">
                                    <div style={{
                                        'backgroundImage': `url(${slideImages[0]})`,
                                        width: '100%',
                                        height: '10cm',
                                        objectFit: 'inherit',
                                        textAlign: 'center'
                                    }}>
                                        <br/><br/><br/><br/><br/><br/>
                                        <h3>Step 1</h3>
                                        <h1>Book your Doctor here</h1>
                                    </div>
                                </div>
                                <div className="each-slide">
                                    <div style={{
                                        'backgroundImage': `url(${slideImages[1]})`,
                                        width: '100%',
                                        height: '10cm',
                                        objectFit: 'inherit',
                                        textAlign: 'center'
                                    }}>
                                        <br/><br/><br/><br/><br/><br/>
                                        <h3>Step 2</h3>
                                        <h1>Find your bookins on your Google
                                            Calendar</h1>
                                    </div>
                                </div>
                                <div className="each-slide">
                                    <div style={{
                                        'backgroundImage': `url(${slideImages[2]})`,
                                        width: '100%',
                                        height: '10cm',
                                        objectFit: 'inherit'
                                    }}>
                                        <br/><br/><br/><br/><br/><br/>
                                        <h3>Step 3</h3>
                                        <h1>Invoice will be added to your Google
                                            Drive</h1>
                                    </div>
                                </div>
                                <div className="each-slide">
                                    <div style={{
                                        'backgroundImage': `url(${slideImages[3]})`,
                                        width: '100%',
                                        height: '10cm',
                                        objectFit: 'inherit'
                                    }}>
                                        <br/><br/><br/><br/><br/><br/>
                                        <h3>Stay Safe</h3>
                                        <h1>Wear Mask :)</h1>
                                    </div>
                                </div>
                            </Slide>
                            <br/>
                            <br/>

                            <hr/>
                            <Button variant={'outline-primary'}
                                    onClick={() => this.goToLogin()}> <b>Book Now ! </b></Button>

                        </div>

                    </Col>
                </Row>


            </Container>
        );
    }
}

export default withRouter(Home);
