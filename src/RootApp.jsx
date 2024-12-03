import React, { useReducer } from 'react';

import { BrowserRouter } from 'react-router-dom';

import { context, initialState } from './store/store';
import reducer from './store/reducer';
import App from './App';
import { NotificationProvider } from './components/Notification/NotificationProvider';

const RootApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BrowserRouter>
      <NotificationProvider>
        <context.Provider
          value={{
            state,
            dispatch,
          }}
        >
          <App />
        </context.Provider>
      </NotificationProvider>
    </BrowserRouter>
  );
};

export default RootApp;
