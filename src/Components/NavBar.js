import { useContext } from 'react';
import { Link as RRDLink } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core';
import { makeStyles, Button } from '@material-ui/core';
import { AuthContext } from '../Contexts/AuthContext';
import { AccountCircle } from '@material-ui/icons';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    leftBar: {
      flexBasis: '90%'
    }
  }));

  const loggedIn = () => {
    return (
      <>
        <IconButton
          label="Current user account info"
          component={RRDLink}
          to="/profile"
        >
          {user.photoURL ? (
            <Avatar alt={user.displayName || null} src={user.photoURL} />
          ) : (
            <Avatar>
              <AccountCircle />
            </Avatar>
          )}
        </IconButton>
        <Button onClick={logout}>Logout</Button>
      </>
    );
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <div className={classes.leftBar}>
            <Button component={RRDLink} to="/">
              <Typography variant="h5">TaskMan</Typography>
            </Button>
            <Button component={RRDLink} to="/new">
              Create New Project
            </Button>
          </div>
          <div className={classes.rightBar}>
            {user ? (
              loggedIn()
            ) : (
              <Button edge="end" component={RRDLink} to="/login">
                Login
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
