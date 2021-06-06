import { useContext } from 'react';
import { Button } from '@material-ui/core';
import { AuthContext } from '../Contexts/AuthContext';

const Login = () => {
  const { user, loginWithGoogle, logout } = useContext(AuthContext);
  return (
    <>
      {user ? (
        <Button color="primary" variant="contained" onClick={logout}>
          Logout
        </Button>
      ) : (
        <Button color="primary" variant="contained" onClick={loginWithGoogle}>
          Login
        </Button>
      )}
    </>
  );
};

export default Login;
