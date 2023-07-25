import { child, get, ref } from 'firebase/database';
import { auth, database } from '../firebase/firebase';
import {
  ADD_EXPENSES,
  ADD_LIST,
  AUTHENTICATION,
  AUTH_FAILED,
  AUTH_START,
  CLEAR_ERROR,
  DELETE_EXPENSE,
  DELETE_LIST,
  FETCH_DATA,
  SELECT_EXPENSES,
  SELECT_LIST,
  SET_EXPENSES,
  SET_FILTERS,
  SIGN_OUT,
  UPDATE_EXPENSE_PENDING_AMOUNT,
} from './actions.types';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { initialState } from './store';
export const userAuthState =
  ({ navigate }) =>
  async dispatch => {
    dispatch({
      type: AUTH_START,
    });
    const dbRef = ref(database);
    await onAuthStateChanged(auth, async user => {
      if (user) {
        await get(child(dbRef, `users/${user.uid}`))
          .then(snapshot => {
            if (snapshot.exists()) {
              dispatch({
                type: FETCH_DATA,
                payload: snapshot.val(),
              });
            } else {
              dispatch({
                type: FETCH_DATA,
                payload: initialState,
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
        dispatch({
          type: AUTHENTICATION,
          payload: {
            uid: user.uid,
            email: user.email,
          },
        });
        navigate('/');
      } else {
        navigate('/auth');
        dispatch({
          type: AUTH_FAILED,
          payload: false,
        });
      }
    });
  };

export const registerUser =
  ({ email, password, navigate }) =>
  async dispatch => {
    dispatch({
      type: AUTH_START,
    });

    await createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        dispatch({
          type: AUTHENTICATION,
          payload: {
            uid: user.uid,
            email: user.email,
          },
        });
        navigate('/');
      })
      .catch(error => {
        dispatch({
          type: AUTH_FAILED,
          payload: error.code,
        });
      });
  };

export const loginUser =
  ({ email, password, navigate }) =>
  async dispatch => {
    dispatch({
      type: AUTH_START,
    });
    await signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        dispatch({
          type: AUTHENTICATION,
          payload: {
            uid: user.uid,
            email: user.email,
          },
        });
        navigate('/');
      })
      .catch(error => {
        dispatch({
          type: AUTH_FAILED,
          payload: error.code,
        });
      });
  };

export const signOutUser = () => dispatch => {
  signOut(auth)
    .then(() => {
      dispatch({
        type: SIGN_OUT,
      });
    })
    .catch(error => {
      dispatch({
        type: AUTH_FAILED,
        payload: error.code,
      });
    });
};

export const createNewList = data => dispatch => {
  dispatch({
    type: ADD_LIST,
    payload: data,
  });
};

export const selectList = data => dispatch => {
  dispatch({
    type: SELECT_LIST,
    payload: data,
  });
};

export const setExpenses = data => dispatch => {
  dispatch({
    type: SET_EXPENSES,
    payload: data,
  });
};
export const addExpenses = data => dispatch => {
  dispatch({
    type: ADD_EXPENSES,
    payload: data,
  });
};

export const deleteList = id => dispatch => {
  dispatch({
    type: DELETE_LIST,
    payload: id,
  });
};
export const setFilters = data => dispatch => {
  dispatch({
    type: SET_FILTERS,
    payload: data,
  });
};

export const selectedExpences = data => dispatch => {
  dispatch({
    type: SELECT_EXPENSES,
    payload: data,
  });
};

export const updateExpensePendingAmount = (listId, expenseId) => dispatch => {
  dispatch({
    type: UPDATE_EXPENSE_PENDING_AMOUNT,
    payload: {
      listId,
      expenseId,
    },
  });
};

export const deleteExpense = (listID, expenseID) => dispatch => {
  dispatch({
    type: DELETE_EXPENSE,
    payload: {
      listID,
      expenseID,
    },
  });
};

export const clearErrors = () => dispatch => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
