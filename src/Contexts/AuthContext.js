import React, { createContext } from 'react';
import { auth } from '../firebaseConfig';

export const AuthContext = createContext();

class AuthContextProvider extends React.Component {
    constructor(props){
        super(props);
        this.state={
            userInfo: ''
        }
    }
    render(){
        return(
            'hello'
        )
    }
}

export default AuthContextProvider;