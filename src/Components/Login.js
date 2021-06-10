import { useState, useContext } from 'react';
import { makeStyles, Button, TextField, Paper, Typography } from '@material-ui/core';
import { AuthContext } from '../Contexts/AuthContext';

const Login = () => {
  const { user, login, loginWithGoogle, logout } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
  
  const handleChange = e => {
    if(e.target.id === 'email'){
      setEmail(e.target.value)
    }
    else if(e.target.id === 'password'){
      setPassword(e.target.value);
    }
  }
  const loginPage = () => {
    return (
      <>
      <Paper className={classes.loginBox}>
      <Typography variant="h4" className={classes.title}>Log into TaskMan</Typography>
        <form noValidate autoComplete="off" onSubmit={(e) => login(e, email, password)}>
          <TextField id="email" value={email} label="Email Address" type="email" onChange={handleChange}/>
          <TextField id="password" value={password} label="Password" type="password" onChange={handleChange} />
          <Button type="submit">Email Login</Button>
        </form>
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
