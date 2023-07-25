import React, { useContext, useEffect } from 'react';
import Authentication from './screens/Authentication/Authentication';
import Home from './screens/Home/Home';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { context } from './store/store';
import { userAuthState } from './store/actions';
import Loading from './screens/Loading/Loading';
import { database } from './firebase/firebase';
import { ref, set } from 'firebase/database';

const App = () => {
  const { state, dispatch } = useContext(context);
  const navigate = useNavigate();
  useEffect(() => {
    userAuthState({ navigate })(dispatch);
  }, []);
  console.log(state);
  useEffect(() => {
    if (state.user && state.dataFetched) {
      set(ref(database, 'users/' + state.user.uid), {
        lists: state.lists,
      });
      console.log('STATE DONE');
    }
  }, [state]);

  return (
    <div>
      {state.loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route
            path="/"
            element={state.user ? <Home /> : <Navigate to="/auth" />}
          />
          <Route path="/auth" element={<Authentication />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
