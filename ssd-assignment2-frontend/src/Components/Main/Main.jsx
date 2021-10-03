import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import {Redirect, Route, Switch} from 'react-router-dom';
import Home from '../Home/Home';
import Login from '../Login/Login';
import ChannelingForm from '../Channeling/ChannelingForm';
import FileUpload from '../FileUpload/FileUpload';
import {AuthContext} from '../../context/auth.context';

export default class Main extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = null;
    }


    AppRoutes() {
        if (this.context.isAuthorized) {
            return (
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/channeling">
                        <ChannelingForm/>
                    </Route>
                    <Route exact path="/uploads">
                        {(!this.context.getChannelingDetails()) ? <Redirect to="/channeling" /> : <FileUpload/>}
                    </Route>
                </Switch>
            );
        }  else {

            return (
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/login">
                        <Login/>
                    </Route>
                </Switch>
            )
        }
    }


    render() {
        return (
            <Container>
                <div>
                        {this.AppRoutes()}
                </div>
            </Container>
        );
    }
}
