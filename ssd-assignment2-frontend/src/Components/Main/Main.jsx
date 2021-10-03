import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import {Route, Switch} from 'react-router-dom';
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


    render() {
        return (
            <Container>
                <div>
                    <Switch>
                        {/* <Redirect exact from="/login" to="/"/> */}
                        <Route exact path="/">
                            <Home/>
                        </Route>

                        {
                            (this.context.isAuthorized) ? (
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
                                        <Login/>
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
