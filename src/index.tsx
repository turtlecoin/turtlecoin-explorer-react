import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { w3cwebsocket } from 'websocket';
import { sleep } from './Utils/sleep';

export let client = new w3cwebsocket(
  process.env.REACT_APP_WSS_URI!,
  'echo-protocol'
);

client.onopen = () => {
  console.log('Connected to wss.');
};

client.onclose = async () => {
  await sleep(2000);
  console.log('Attempting wss reconnect...')
  client = new w3cwebsocket(
    process.env.REACT_APP_WSS_URI!,
    'echo-protocol'
  );
}

client.onerror = async (error) => {
  console.error(error);
  await sleep(2000);
  console.log('Attempting wss reconnect...')
  client = new w3cwebsocket(
    process.env.REACT_APP_WSS_URI!,
    'echo-protocol'
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
