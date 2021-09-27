import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import Main from './Components/Main/Main'
import "react-bootstrap/dist/react-bootstrap";

export default class App extends React.Component {
    render() {
        return (
            <div style={{ height: '100vh' }}>
                <Router>
                    <Switch>
                        <Route path="/">
                            <div>
                                {/* navigation bar component. */}
                                <NavigationBar />

                                <Main />
                            </div>
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}
