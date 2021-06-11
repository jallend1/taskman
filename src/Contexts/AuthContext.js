import React, { createContext } from 'react';
import { withRouter } from 'react-router-dom';
import { auth, provider } from '../firebaseConfig';

export const AuthContext = createContext();

class AuthContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: ''
    };
  }

  login = (e, email, password) => {
    e.preventDefault();
    console.log(e, email, password)
    // auth.signInWithEmailAndPassword(email, password);
  }

  loginWithGoogle = () => {
    auth.signInWithPopup(provider).then((result) => {
      if(!result.ok){
        throw Error('There was a problem???')
      }
      const userInfo = result.user;
      this.setState({ userInfo: userInfo }, this.props.history.push('/'));
    }).catch(err => console.log(err.message, err));
  };

  logout = () => {
    auth.signOut().then(() => this.setState({ userInfo: '' }));
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          user: auth.currentUser,
          loginWithGoogle: this.loginWithGoogle,
          login: this.login,
          logout: this.logout
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default withRouter(AuthContextProvider);
