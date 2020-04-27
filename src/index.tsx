import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { w3cwebsocket } from 'websocket';

export const client = new w3cwebsocket(
  process.env.REACT_APP_WSS_URI!,
  'echo-protocol'
);

client.onopen = () => {
  console.log('Connected to wss.');
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
