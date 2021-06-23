import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  // Disabled strict mode because Material-UI utilizes the deprecated findDOMNode
  // <React.StrictMode>
    <App />,
  // </React.StrictMode>,
  document.getElementById('root')
);


