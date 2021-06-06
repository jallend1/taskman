import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ProjectContextProvider from './Contexts/ProjectContext';
import AuthContextProvider from './Contexts/AuthContext';

import NavBar from './Components/NavBar';
import Home from './Components/Home';
import About from './Components/About';
import V1 from './v1/Components/Home';
import NewProject from './Components/NewProject';
import Project from './Components/Project';
import Login from './Components/Login';

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
            <Route path="/v1">
              <V1 />
            </Route>
            <ProjectContextProvider>
              <Route path="/new">
                <NewProject />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/project/:id">
                <Project projectInURL={true} />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
            </ProjectContextProvider>
          </Switch>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
