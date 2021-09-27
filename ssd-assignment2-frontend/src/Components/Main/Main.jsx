import React from 'react';
import { Container } from 'react-bootstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '../Home/Home';


export default class Main extends React.Component {
    render() {
        return (
            <Container>
                <div>
                    <Switch>
                        <Redirect exact from="/" to="/home" />

                        <Route exact path="/home">
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </Container>
        );
    }
}
