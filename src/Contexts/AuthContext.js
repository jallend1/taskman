import React, { createContext } from 'react';
import { withRouter } from 'react-router-dom';
import { auth, provider, db } from '../firebaseConfig';

export const AuthContext = createContext();

class AuthContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: '',
      status: ''
    };
  }

  componentDidMount(){
    auth.onAuthStateChanged(user => {
      if(user){
        this.setState({userInfo: user, status: ''})
      }
      else{
        this.setState({userInfo: ''})
      }
    });
  }

  createNew = (e, email, password, bio) => {
    console.log(bio);
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.setState({userInfo: result.user})
        return db.collection('users').doc(result.user.uid).set({
          bio
        });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          this.setState({ status: error.message });
        }
        console.log(error);
      });
  };
  login = (e, email, password) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        const userInfo = result.user;
        this.setState({ userInfo, status: '' });
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          this.setState({
            status:
              "We don't see an account under that email address. Should we make one?"
          });
        } else if (error.code === 'auth/wrong-password') {
          this.setState({
            status: "That password doesn't match what we got over here."
          });
        }
        console.log(error);
      });
  };

  loginWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        const userInfo = result.user;
        this.setState({ userInfo: userInfo }, this.props.history.push('/'));
      })
      .catch((err) => console.log(err.message));
  };

  logout = () => {
    auth.signOut().then(() => this.setState({ userInfo: '' }));
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          user: auth.currentUser,
          createNew: this.createNew,
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
