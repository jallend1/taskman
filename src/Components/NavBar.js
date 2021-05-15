import { AppBar, Toolbar, Typography } from "@material-ui/core";

const NavBar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
            <Typography variant="h5">TaskMan</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;