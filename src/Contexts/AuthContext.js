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

  loginWithGoogle = () => {
    auth.signInWithPopup(provider).then((result) => {
      const userInfo = result.user;
      this.setState({ userInfo: userInfo }, this.props.history.push('/'));
    });
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
          logout: this.logout
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default withRouter(AuthContextProvider);
