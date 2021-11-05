import React from 'react';
import ReactDOM from 'react-dom';
import KusamaHome from './Components/Kusama/Home.js';
import './index.css';
import App from './App';
//Main Context
import { ContextProvider } from './Context/Context.js';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ContextProvider>
      <KusamaHome />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);