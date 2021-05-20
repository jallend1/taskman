import { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { db, auth } from './firebaseConfig';

import { ProjectContext } from './Contexts/ProjectContext';
import ProjectContextProvider from './Contexts/ProjectContext';

import NavBar from './Components/NavBar';
import Home from './Components/Home';
import About from './Components/About';
import V1 from './v1/Components/Home';

function App() {
  const [projects, setProjects] = useState([]);
  console.log(useContext(ProjectContext));

  // const sampleProject = {
  //   title: 'My First Project!',
  //   createdAt: new Date().toDateString(),
  //   id: 5000,
  //   taskList: [
  //     { action: 'Play Mario Kart', isComplete: true },
  //     { action: 'Do laundry', isComplete: false },
  //     { action: 'Union meeting', isComplete: false }
  //   ]
  // };

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
