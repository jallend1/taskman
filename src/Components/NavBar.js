import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Link as RRDLink } from 'react-router-dom';
import { makeStyles, Button } from '@material-ui/core';

const NavBar = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    }
  }));

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Button component={RRDLink} to="/">
            <Typography variant="h5">TaskMan</Typography>
          </Button>
          <Button component={RRDLink} to="/new">
            Create New Project
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
