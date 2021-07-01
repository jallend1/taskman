import { useContext } from 'react';
import { Link as RRDLink } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography
} from '@material-ui/core';
import { AuthContext } from '../Contexts/AuthContext';
import { AccountCircle, ChevronLeft, Menu } from '@material-ui/icons';

const NavBar = ({ drawerOpen, handleDrawer, drawerWidth }) => {
  const { user, logout } = useContext(AuthContext);
  const useStyles = makeStyles((theme) => ({
    open: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    },
    closed: {
      width: '100%'
    },
    collapse: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    spacious: {
      margin: '0 5em',
      flexGrow: 1,
      backgroundColor: '#FEA443'
    },
    drawer: {
      width: drawerWidth
    },
    drawerPaper: {
      width: drawerWidth
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
    <>
      <AppBar
        position="static"
        color="primary"
        className={drawerOpen ? classes.open : classes.closed}
      >
        <Toolbar>
          <IconButton onClick={handleDrawer}>
            <Menu />
          </IconButton>
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
      <Drawer
        anchor="left"
        variant="persistent"
        className={classes.drawer}
        open={drawerOpen}
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleDrawer}
            className={classes.collapse}
          >
            Collapse
            <ChevronLeft />
          </Button>
        </div>
        <Divider />
        <List>
          {['All', 'Active', 'Complete', 'Archived'].map((status) => (
            <ListItem
              component={RRDLink}
              to={`/projects/${status.toLowerCase()}`}
              key={status}
            >
              <ListItemText>{status}</ListItemText>
            </ListItem>
          ))}
          <ListItem></ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>List clickable project tags here</ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;
