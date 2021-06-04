import { useContext } from 'react';
import { Button } from "@material-ui/core";
import { AuthContext } from '../Contexts/AuthContext'

const Login = () => {
  const { user } = useContext(AuthContext)
  return (
    <>
      <Button variant="secondary">Login</Button>
    </>
  );
};

export default Login;
