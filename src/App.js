import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProjectContextProvider from './Contexts/ProjectContext';
import AuthContextProvider from './Contexts/AuthContext';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import About from './Components/About';
import NewProject from './Components/NewProject';
import Project from './Components/Project';
import Login from './Components/Login';
import Profile from './Components/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <NavBar />
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <ProjectContextProvider>
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
              <Route exact path="/">
                <Home />
              </Route>
            </ProjectContextProvider>
          </Switch>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
