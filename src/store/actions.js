import { child, get, ref } from 'firebase/database';
import { auth, database } from '../firebase/firebase';
import {
  AUTH_START,
  AUTHENTICATION,
  AUTH_FAILED,
  SIGN_OUT,
  FETCH_DATA,
  ADD_TRANSACTION,
  DELETE_TRANSACTION,
  CLEAR_ERROR,
  SET_PROFILE,
  SET_MONTHLY_BUDGET,
  CREATE_PERSONAL_LIST,
  DELETE_PERSONAL_LIST,
  ADD_SAVED_TRANSACTION,
  DELETE_SAVED_TRANSACTION,
} from './actions.types';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { showNotification } from '../components/Notification/NotificationProvider';

export const userAuthState =
  ({ navigate }) =>
  async dispatch => {
    dispatch({ type: AUTH_START });

    const dbRef = ref(database);
    await onAuthStateChanged(auth, async user => {
      if (user) {
        await get(child(dbRef, `users/${user.uid}`))
          .then(snapshot => {
            if (snapshot.exists()) {
              dispatch({ type: FETCH_DATA, payload: snapshot.val() });
            } else {
              dispatch({
                type: FETCH_DATA,
                payload: {},
              });
            }
          })
          .catch(err => console.error(err));
        dispatch({
          type: AUTHENTICATION,
          payload: { uid: user.uid, email: user.email },
        });
        navigate('/');
        showNotification('Welcome back!', 'info');
      } else {
        navigate('/auth');
        dispatch({ type: AUTH_FAILED });
      }
    });
  };

// Register a new user
export const registerUser =
  ({ email, password, navigate }) =>
  async dispatch => {
    dispatch({ type: AUTH_START });

    await createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        dispatch({
          type: AUTHENTICATION,
          payload: { uid: user.uid, email: user.email },
        });
        navigate('/');
      })
      .catch(error => {
        dispatch({ type: AUTH_FAILED, payload: error.code });
      });
  };

// Log in an existing user
export const loginUser =
  ({ email, password, navigate }) =>
  async dispatch => {
    dispatch({ type: AUTH_START });

    await signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        dispatch({
          type: AUTHENTICATION,
          payload: { uid: user.uid, email: user.email },
        });
        navigate('/');
        showNotification('Welcome back!', 'info');
      })
      .catch(error => {
        dispatch({ type: AUTH_FAILED, payload: error.code });
      });
  };

// Log out the current user
export const signOutUser = () => dispatch => {
  signOut(auth)
    .then(() => {
      dispatch({ type: SIGN_OUT });
    })
    .catch(error => {
      dispatch({ type: AUTH_FAILED, payload: error.code });
    });
  showNotification('Successfully logged out.', 'success');
};

export const fetchData = data => dispatch => {
  dispatch({
    type: FETCH_DATA,
    payload: data,
  });
};

export const addTransaction =
  ({ transection, pId, mId }) =>
  dispatch => {
    dispatch({
      type: ADD_TRANSACTION,
      payload: { transection, pId, mId },
    });
    showNotification('Transaction added!', 'success');
  };

// Delete a transaction
export const deleteTransaction = (id, mId, pId) => dispatch => {
  dispatch({
    type: DELETE_TRANSACTION,
    payload: { id, mId, pId },
  });
  showNotification('Transaction removed.', 'error');
};

export const setProfileChange = data => dispatch => {
  dispatch({
    type: SET_PROFILE,
    payload: data,
  });
  showNotification('Profile updated!', 'success');
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERROR });
};

export const setMonthlyBudget = (monthYear, planned) => dispatch => {
  dispatch({
    type: SET_MONTHLY_BUDGET,
    payload: { monthYear, planned },
  });
  showNotification('Budget updated!', 'success');
};

export const createPersonalList =
  ({ name, pId }) =>
  dispatch => {
    dispatch({
      type: CREATE_PERSONAL_LIST,
      payload: { name, pId },
    });
    showNotification('List created!', 'success');
  };

export const deletePersonalList = listId => dispatch => {
  dispatch({
    type: DELETE_PERSONAL_LIST,
    payload: { listId },
  });
  showNotification('List deleted.', 'error');
};

export const addSavedTransaction = transaction => dispatch => {
  dispatch({
    type: ADD_SAVED_TRANSACTION,
    payload: transaction,
  });
};

export const deleteSavedTransaction = transactionId => dispatch => {
  dispatch({
    type: DELETE_SAVED_TRANSACTION,
    payload: transactionId,
  });
  showNotification('Transaction removed.', 'error');
};
