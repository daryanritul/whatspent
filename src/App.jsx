import React, { useContext, useEffect } from 'react';
import Authentication from './screens/Authentication/Authentication';
import Home from './screens/Home/Home';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { context } from './store/store';
import { userAuthState } from './store/actions';
import Loading from './screens/Loading/Loading';
import { database } from './firebase/firebase';
import { ref, set } from 'firebase/database';
import Profile from './screens/Profile/Profile';
import Header from './components/Header/Header';
import Saved from './screens/Saved/Saved';

const App = () => {
  const { state, dispatch } = useContext(context);
  const navigate = useNavigate();

  useEffect(() => {
    userAuthState({ navigate })(dispatch);
  }, []);

  useEffect(() => {
    if (state.user && state.dataFetched) {
      set(ref(database, `users/${state.user.uid}`), {
        profile: state.profile,
        financialData: state.financialData,
      });
    }
  }, [state.profile, state.financialData]);

  return (
    <div className="appContainer">
      {state.loading ? (
        <Loading />
      ) : (
        <>
          {state.user && <Header />}
          <Routes>
            <Route
              path="/profile"
              element={state.user ? <Profile /> : <Navigate to="/auth" />}
            />
            <Route
              path="/"
              element={state.user ? <Home /> : <Navigate to="/auth" />}
            />
            <Route path="/auth" element={<Authentication />} />
            <Route
              path="/saved"
              element={state.user ? <Saved /> : <Navigate to="/auth" />}
            />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
