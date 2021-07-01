import {
  BrowserRouter,
  Switch,
  Route,
  Link as RRDLink
} from 'react-router-dom';
import {
  makeStyles,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import ProjectContextProvider from './Contexts/ProjectContext';
import AuthContextProvider from './Contexts/AuthContext';
import ProjectList from './Components/ProjectList';

import NavBar from './Components/NavBar';
import Home from './Components/Home';
import About from './Components/About';
import NewProject from './Components/NewProject';
import Project from './Components/Project';
import Login from './Components/Login';
import Profile from './Components/Profile';

function App() {
  const drawerWidth = 240;
  const useStyles = makeStyles((theme) => ({
    drawer: {
      width: drawerWidth
    },
    drawerPaper: {
      width: drawerWidth
    }
  }));
  const classes = useStyles();
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <ProjectContextProvider>
            <NavBar drawerWidth={drawerWidth} />
            <Drawer
              anchor="left"
              variant="persistent"
              className={classes.drawer}
              open={false}
              classes={{ paper: classes.drawerPaper }}
            >
              <div>Drawer Header Here!</div>
              <Divider />
              <List>
                {['All', 'Active', 'Complete', 'Archive'].map((status) => (
                  <ListItem
                    component={RRDLink}
                    to={`/projects/${status.toLowerCase()}`}
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
            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/new">
                <NewProject />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/project/:id">
                <Project projectInURL={true} />
              </Route>
              <Route path="/projects/:filter">
                <ProjectList />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </ProjectContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
