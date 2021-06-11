import { useState, useContext } from 'react';
import {
  makeStyles,
  Button,
  ButtonGroup,
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
      maxWidth: '600px',
      margin: '2em auto',
      padding: '2em'
    },
    title: {
      textAlign: 'center'
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
          <Typography variant="h4" className={classes.title}>
            Log into TaskMan
          </Typography>
          <form
            noValidate
            autoComplete="off"
            onSubmit={(e) => login(e, email, password)}
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
            <Button type="submit">Email Login</Button>
          </form>
          <ButtonGroup>
            <Button
              color="primary"
              variant="outlined"
              onClick={loginWithGoogle}
            >
              Sign In With Google
            </Button>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => setNewUser(true)}
            >
              Create a New Account
            </Button>
          </ButtonGroup>
        </Paper>
      </>
    );
  };

  const newUserForm = () => {
    return (
      <Paper className={classes.loginBox}>
        <Typography variant="h4" className={classes.title}>
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
            type="submit"
            color="primary"
            variant="contained"
            onClick={(e) => createNew(e, email, password)}
          >
            Create a New Account
          </Button>
        </form>
        <Button onClick={() => setNewUser(false)}>
          Or Login to an Existing Account
        </Button>
      </Paper>
    );
  };

  return (
    <>
      {/* TODO: Create a profile page and get rid of this goofiness */}
      {user && (
        <Button color="primary" variant="contained" onClick={logout}>
          Logout
        </Button>
      )}
      {newUser ? newUserForm() : loginPage()}
    </>
  );
};

export default Login;
