import React from 'react';
import {AuthContext} from '../../context/auth.context';
import {Button} from 'react-bootstrap';
import {Slide} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';


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

export default class Home extends React.Component {

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

    componentDidMount() {
        // console.log(this.context.accessToken);
    }

    goToLogin() {
        window.location = '/login';
    }

    render() {
        return (
            <div style={{textAlign: 'center', height: '500px'}}>

                <br/>
                <br/>
                <br/>


                <h1 style={{fontFamily: 'cursive'}}>Book your Doctor with E-DOC</h1>

                <hr/>
                <div className="row" style={{marginTop: '5%'}}>

                    <div className="col-md-12">

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
                                        <h3 style={{fontFamily: 'cursive'}}>Step 1</h3>
                                        <h1 style={{fontFamily: 'cursive'}}>Book your Doctor here</h1>
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
                                        <h3 style={{fontFamily: 'cursive'}}>Step 2</h3>
                                        <h1 style={{fontFamily: 'cursive'}}>Find your bookins on your Google
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
                                        <h3 style={{fontFamily: 'cursive'}}>Step 3</h3>
                                        <h1 style={{fontFamily: 'cursive'}}>Invoice will be added to your Google
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
                                        <h3 style={{fontFamily: 'cursive'}}>Stay Safe</h3>
                                        <h1 style={{fontFamily: 'cursive'}}>Wear Mask :)</h1>
                                    </div>
                                </div>
                            </Slide>
                            <br/>
                            <br/>

                            <hr/>
                            <Button style={{
                                textAlign: 'center',
                                backgroundColor: 'white',
                                color: 'black',
                                fontSize: '20px'
                            }} onClick={this.goToLogin}> <b>Book Now ! </b></Button>

                        </div>

                    </div>
                </div>


            </div>
        );
    }
}

