import { useContext } from "react";
import { Link as RRDLink } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Button,
  ButtonGroup,
  Chip,
  Divider,
  Drawer,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { AuthContext } from "../Contexts/AuthContext";
import { ProjectContext } from "../Contexts/ProjectContext";
import { AccountCircle, ChevronLeft, Menu } from "@material-ui/icons";

const NavBar = ({ drawerOpen, handleDrawer, drawerWidth }) => {
  const { user, logout } = useContext(AuthContext);
  const { tags } = useContext(ProjectContext);
  const useStyles = makeStyles((theme) => ({
    root: {
      // backgroundColor: '#bfecff',
      backgroundColor: "#fff",
      display: "flex",
      justifyContent: "space-between",
    },
    open: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    closed: {
      width: "100%",
    },
    collapse: {
      display: "flex",
      justifyContent: "space-between",
    },
    chips: {
      padding: "1.25em",
      display: "flex",
      justifyContent: "space-around",
    },
    createButton: {
      backgroundColor: "#D91A60",
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
      background: "transparent",
      backdropFilter: "blur(5px)",
    },
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
        style={{ boxShadow: "none" }}
      >
        <Toolbar className={classes.root}>
          <div>
            <IconButton onClick={handleDrawer}>
              <Menu />
            </IconButton>
            <Button component={RRDLink} to="/">
              <Typography variant="h5">TaskMan 3.0</Typography>
            </Button>
          </div>
          <div>
            <Button
              color="secondary"
              variant="contained"
              component={RRDLink}
              to="/new"
              className={classes.createButton}
            >
              Create A New Project
            </Button>
          </div>
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
            variant="outlined"
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
        <ButtonGroup orientation="vertical" variant="text">
          {["All", "Active", "Complete", "Archived"].map((status) => (
            <Button
              fullWidth
              component={RRDLink}
              to={`/projects/${status.toLowerCase()}`}
              key={status}
            >
              {status}
            </Button>
          ))}
        </ButtonGroup>
        <Divider />
        <div className={classes.chips}>
          {tags.map((tag) => (
            <Chip
              label={tag}
              color="primary"
              component={RRDLink}
              to={`/projects/tag/${tag}`}
              key={tag}
              clickable
            />
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default NavBar;
