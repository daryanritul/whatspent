import { ADD_LIST, SELECT_LIST } from './actions.types';

export default (state, { type, payload }) => {
  switch (type) {
    case ADD_LIST:
      return {
        ...state,
        lists: [...state.lists, payload],
      };
    case SELECT_LIST:
      return {
        ...state,
        selectedList: payload,
      };
  }
};
