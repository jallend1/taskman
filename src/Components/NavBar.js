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

const NavBar = ({drawerWidth}) => {
  const { user, logout } = useContext(AuthContext);
  const useStyles = makeStyles((theme) => ({
    root: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    },
    spacious: {
      margin: '0 5em',
      flexGrow: 1,
      backgroundColor: '#FEA443'
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
    <AppBar position="static" color="primary" className={classes.root}>
      <Toolbar>
        <Button component={RRDLink} to="/">
          <Typography variant="h5">TaskMan 2.0</Typography>
        </Button>
        <Button
          color="secondary"
          variant="contained"
          component={RRDLink}
          to="/new"
          className={classes.spacious}
        >
          Create A New Project
        </Button>
        <div>
          {user ? (
            loggedIn()
          ) : (
            <Button edge="end" component={RRDLink} to="/login">
              Login
            </Button>
          )}
          <Button component={RRDLink} to="/about">
            About
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
