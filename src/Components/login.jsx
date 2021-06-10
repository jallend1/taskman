import { useContext } from 'react';
import { makeStyles, Button, Paper, Typography } from '@material-ui/core';
import { AuthContext } from '../Contexts/AuthContext';

const Login = () => {
  const { user, loginWithGoogle, logout } = useContext(AuthContext);
  const useStyles = makeStyles({
    loginBox: {
      maxWidth: "600px",
      margin: "2em auto",
      padding: "2em"
    },
    title: {
      textAlign: "center"
    }
  })

  const classes=useStyles();
  
  const loginPage = () => {
    return (
      <>
      <Paper className={classes.loginBox}>
      <Typography variant="h4" className={classes.title}>Log into TaskMan</Typography>
        <Button color="primary" variant="contained" onClick={loginWithGoogle}>
          Login
        </Button>
        </Paper>
        </>
    )
  }

  return (
    <>
      {user ? (
        <Button color="primary" variant="contained" onClick={logout}>
          Logout
        </Button>
      ) : loginPage()}
    </>
  );
};

export default Login;
