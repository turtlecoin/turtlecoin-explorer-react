import React from 'react';
import Router from './Router';
import './Stylesheets/style.scss';
import './Stylesheets/github.scss';
import './Stylesheets/monokai.scss';
import { BrowserRouter } from 'react-router-dom';

export let darkMode = false;

if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
  console.log('🎉 prefers-color-scheme is supported');
  darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  console.log('Dark mode OS preference is ' + darkMode);
}

function App() {
  return (
    <BrowserRouter>
      <Router className={darkMode ? 'dark' : 'light'} />
    </BrowserRouter>
  );
}

export default App;
