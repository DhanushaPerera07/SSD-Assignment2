import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '../Home/Home';
import Login from '../Login/Login';
import ChannelingForm from '../Channeling/ChannelingForm';
import FileUpload from '../FileUpload/FileUpload';
import { AuthContext } from '../../context/auth.context';
// import { getGoogleAuth} from '../../service/google-oauth.service.js';

export default class Main extends Component {

    static contextType = AuthContext;

    constructor(props){
        super(props);
        this.state = {
            accessToken: null
        }
    }

    componentDidMount(){
        // console.log('Main componentDidMount before: ',  this.state.accessToken);
        // this.setState({accessToken: GoogleAuth?.getToken()?.access_token});
        // console.log('Main componentDidMount after: ',  this.state.accessToken);
        console.log('Main componentDidMount works');
        // console.log(this.context);
        this.setState({accessToken: this.context.accessToken});
        // getGoogleAuth().then(GoogleAuth => {
        //     console.log('Google auth is not empty');
        //     this.setState({accessToken: GoogleAuth?.getToken()?.access_token});
        // }).catch(GoogleAuth=> console.error);
    }


    render() {


        return (
            <Container>
                <div>
                    <Switch>
                        {/* <Redirect exact from="/login" to="/"/> */}
                        <Route exact path="/">
                            <Home />
                        </Route>
                        
                        {
                            (this.context.accessToken) ? (
                            <>
                            <Route path="/channeling">
                                <ChannelingForm/>
                            </Route>
                            <Route path={'/uploads'}>
                                <FileUpload/>
                            </Route>
                            </>
                            ) : (
                                <>
                                <Route exact path="/login">
                                    <Login />
                                 </Route>
                                </>
                            )
                        }

                    </Switch>
                </div>
            </Container>
        );
    }
}
