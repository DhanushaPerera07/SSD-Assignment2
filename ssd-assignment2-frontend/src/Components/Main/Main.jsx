import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import {Redirect, Route, Switch} from 'react-router-dom';
import Home from '../Home/Home';
import Login from '../Login/Login';
import ChannelingForm from '../Channeling/ChannelingForm';
import FileUpload from '../FileUpload/FileUpload';


export default class Main extends Component {
    render() {
        return (
            <Container>
                <div>
                    <Switch>
                        <Redirect exact from="/" to="/"/>
                        <Route exact path="/login">
                            <Login/>
                        </Route>
                        <Route exact path="/home">
                            <Home/>
                        </Route>
                        <Route path="/channeling">
                            <ChannelingForm/>
                        </Route>
                        <Route path={'/uploads'}>
                            <FileUpload/>
                        </Route>
                    </Switch>
                </div>
            </Container>
        );
    }
}
