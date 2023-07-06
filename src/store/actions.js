import { ADD_LIST, SELECT_LIST } from './actions.types';

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
