import { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProjectContextProvider from './Contexts/ProjectContext';
import AuthContextProvider from './Contexts/AuthContext';
import { makeStyles } from '@material-ui/core';

import ProjectList from './Components/ProjectList';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import About from './Components/About';
import NewProject from './Components/NewProject';
import Project from './Components/Project';
import Login from './Components/Login';
import Profile from './Components/Profile';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const drawerWidth = 240;

  const useStyles = makeStyles((theme) => ({
    open: {
      marginLeft: drawerWidth + 25
    },
    closed: {
      marginLeft: 0
    }
  }));

  const classes = useStyles();

  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <ProjectContextProvider>
            <NavBar
              handleDrawer={handleDrawer}
              drawerOpen={drawerOpen}
              drawerWidth={drawerWidth}
            />
            <main className={drawerOpen ? classes.open : classes.closed}>
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
            </main>
          </ProjectContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
