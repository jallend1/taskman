import { AppBar, Toolbar, Typography } from "@material-ui/core";

const NavBar = () => {
  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <Typography variant="h5">TaskMan v1.0</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
