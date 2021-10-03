import React, { Component, createContext } from 'react';
import { AuthProvider } from './auth.context';


const ChannelingContext = createContext({});

class ChannelingProvider extends Component {

    constructor(props){
        super(props);
        this.state = null
    }

    render() { 
        return <ChannelingContext.Provider value={{
            doctorName: 'Mike'
        }}>
              {this.props.children}  
        </ChannelingContext.Provider>;
    }
}


const ChannelingConsumer = ChannelingContext.Consumer;
export  {
    ChannelingProvider,
    ChannelingContext,
    ChannelingConsumer
};