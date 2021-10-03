import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {AuthProvider} from './context/auth.context';
import { ChannelingProvider } from './context/channeling.context';
import 'react-slideshow-image/dist/styles.css';

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <ChannelingProvider>
                <App/>
            </ChannelingProvider>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

