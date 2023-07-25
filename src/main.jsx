import React, { useReducer } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './style/global.scss';
import RootApp from './RootApp.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);
