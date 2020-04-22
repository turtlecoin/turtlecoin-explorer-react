import React from 'react';
import Root from './Components/Root';
import './Stylesheets/style.scss';
import './Stylesheets/atom-one-light.scss';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Root />
    </Router>
  );
}

export default App;
