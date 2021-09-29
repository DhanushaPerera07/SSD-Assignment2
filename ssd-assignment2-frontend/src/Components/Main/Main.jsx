import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import {Redirect, Route, Switch} from 'react-router-dom';
import Home from '../Home/Home';
import ChannelingForm from '../Channeling/ChannelingForm';


export default class Main extends Component {
    render() {
        return (
            <Container>
                <div>
                    <Switch>
                        <Redirect exact from="/" to="/home"/>

                        <Route exact path="/home">
                            <Home/>
                        </Route>
                        <Route path="/channeling">
                            <ChannelingForm/>
                        </Route>
                    </Switch>
                </div>
            </Container>
        );
    }
}
