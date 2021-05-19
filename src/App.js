import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NavBar from './Components/NavBar';
import Home from './Components/Home';
import About from './Components/About';
import V1 from './v1/Components/Home';

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
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
