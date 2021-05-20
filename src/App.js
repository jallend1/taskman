import { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { db, auth } from './firebaseConfig';

import ProjectContextProvider from './Contexts/ProjectContext';

import NavBar from './Components/NavBar';
import Home from './Components/Home';
import About from './Components/About';
import V1 from './v1/Components/Home';

function App() {
  const [projects, setProjects] = useState([]);

  const retrieveProjects = () => {
    db.collection('projects')
      .doc('sample')
      .get()
      .then((doc) => setProjects([doc.data()]));
  };

  useEffect(retrieveProjects, []);
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
            <Route exact path="/">
              <Home projects={projects} />
            </Route>
          </ProjectContextProvider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
