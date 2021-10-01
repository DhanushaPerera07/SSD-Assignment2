import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {AuthProvider} from './context/auth.context';
import 'react-slideshow-image/dist/styles.css';

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <App/>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

