import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { auth } from './firebaseConfig';

import ProjectContextProvider from './Contexts/ProjectContext';

import NavBar from './Components/NavBar';
import Home from './Components/Home';
import About from './Components/About';
import V1 from './v1/Components/Home';
import NewProject from './Components/NewProject';
import Project from './Components/Project'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
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
          </ProjectContextProvider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
