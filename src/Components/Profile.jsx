import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { Paper, Typography } from '@material-ui/core';

const Profile = () => {
  const { user } = useContext(AuthContext);
  if (user) {
    return (
      <Paper>
        <Typography>Currently logged in as: {user.displayName}</Typography>
      </Paper>
    );
  } else {
    // TODO: Currently displays for a few seconds if you refresh on this page while signed in
    return (
      <Paper>
        <Typography>Time to sign in, boss.</Typography>
      </Paper>
    );
  }
};

export default Profile;
