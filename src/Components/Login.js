import { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import {
  makeStyles,
  Button,
  TextField,
  Paper,
  Typography
} from '@material-ui/core';
import { AuthContext } from '../Contexts/AuthContext';

const Login = () => {
  const { user, createNew, login, loginWithGoogle, logout } =
    useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newUser, setNewUser] = useState(false);
  const useStyles = makeStyles({
    loginBox: {
      maxWidth: '400px',
      margin: '2em auto',
      padding: '2em',
      textAlign: 'center'
    },
    otherLogins: {
      margin: '2em'
    },
    spacious: {
      margin: '1em'
    }
  });

  const classes = useStyles();

  const handleChange = (e) => {
    if (e.target.id === 'email') {
      setEmail(e.target.value);
    } else if (e.target.id === 'password') {
      setPassword(e.target.value);
    }
  };
  const loginPage = () => {
    return (
      <>
        <Paper className={classes.loginBox}>
          <Typography variant="h4" className={classes.spacious}>
            Log into TaskMan
          </Typography>
          <form
            noValidate
            autoComplete="off"
            onSubmit={(e) => login(e, email, password)}
          >
            <TextField
              autoFocus
              fullWidth
              id="email"
              value={email}
              label="Email Address"
              type="email"
              onChange={handleChange}
            />
            <TextField
              fullWidth
              id="password"
              value={password}
              label="Password"
              type="password"
              onChange={handleChange}
            />
            <Button
              className={classes.spacious}
              type="submit"
              size="large"
              variant="contained"
              color="secondary"
            >
              Email Login
            </Button>
          </form>
          <div className={classes.otherLogins}>
            <Typography variant="h6" align="center">
              Or
            </Typography>
            <Button color="primary" onClick={loginWithGoogle}>
              <img src="./images/google_signin.png" alt="Sign in with Google" />
            </Button>
          </div>
          <div>
            <Button
              align="center"
              color="primary"
              variant="outlined"
              onClick={() => setNewUser(true)}
            >
              Create a New Account
            </Button>
          </div>
        </Paper>
      </>
    );
  };

  const newUserForm = () => {
    return (
      <Paper className={classes.loginBox}>
        <Typography variant="h4" align="center">
          New Account
        </Typography>
        <form
          noValidate
          autoComplete="off"
          onSubmit={(e) => createNew(e, email, password)}
        >
          <TextField
            fullWidth
            id="email"
            value={email}
            label="Email Address"
            type="email"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            id="password"
            value={password}
            label="Password"
            type="password"
            onChange={handleChange}
          />
          <Button
            className={classes.spacious}
            type="submit"
            size="large"
            variant="contained"
            color="secondary"
            onClick={(e) => createNew(e, email, password)}
          >
            Create a New Account
          </Button>
        </form>
        <Button variant="outlined" onClick={() => setNewUser(false)}>
          Or Login to an Existing Account
        </Button>
      </Paper>
    );
  };

  return (
    <>
      {/* TODO: Create a profile page and get rid of this goofiness */}
      {user ? <Redirect to="/" /> : newUser ? newUserForm() : loginPage()}
    </>
  );
};

export default Login;
