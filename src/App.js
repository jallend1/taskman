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
import Footer from './Components/Footer';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerWidth = 240;

  // Root class sets size of everything but the footer in order to keep it at the bottom
  const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: 'calc(100vh - 30px)'
    },
    open: {
      marginLeft: drawerWidth + 25
    },
    closed: {
      marginLeft: 0
    },
    footer: {
      height: 50
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
            <div className={classes.root}>
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
                  {/* Clarify this portion maybe combine into /projects/:filter where filter = primary || tag */}
                  <Route path="/projects/tag/:tagID">
                    <ProjectList />
                  </Route>
                  <Route path="/projects/:filter">
                    <ProjectList />
                  </Route>
                  <Route exact path="/">
                    <Home />
                  </Route>
                </Switch>
              </main>
            </div>
          </ProjectContextProvider>
        </AuthContextProvider>
        <Footer className={classes.footer} />
      </BrowserRouter>
    </div>
  );
}

export default App;
