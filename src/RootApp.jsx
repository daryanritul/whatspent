import React, { useReducer } from 'react';

import { BrowserRouter } from 'react-router-dom';

import { context, initialState } from './store/store';
import reducer from './store/reducer';
import App from './App';

const RootApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BrowserRouter>
      <context.Provider
        value={{
          state,
          dispatch,
        }}
      >
        <App />
      </context.Provider>
    </BrowserRouter>
  );
};

export default RootApp;
