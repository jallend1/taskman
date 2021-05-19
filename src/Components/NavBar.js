import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Link as RRDLink } from 'react-router-dom';
import { Button } from '@material-ui/core';

const NavBar = () => {
  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <Button component={RRDLink} to="/">
          <Typography variant="h5">TaskMan</Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
