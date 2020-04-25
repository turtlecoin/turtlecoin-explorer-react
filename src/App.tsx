import React from 'react';
import Root from './Components/Root';
import './Stylesheets/style.scss';
import './Stylesheets/github.scss';
import { BrowserRouter as Router } from 'react-router-dom';

let darkMode = false;

if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
  console.log('🎉 prefers-color-scheme is supported');
  darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  console.log('Dark mode OS preference is ' + darkMode);
}

function App() {
  return (
    <Router>
      <Root className={darkMode ? 'dark' : 'light'} />
    </Router>
  );
}

export default App;
