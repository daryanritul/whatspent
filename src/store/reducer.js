import {
  ADD_EXPENSES,
  ADD_LIST,
  AUTHENTICATION,
  AUTH_FAILED,
  AUTH_START,
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
import { initialState } from './store';
export default (state, { type, payload }) => {
  const selectedList = state.lists.find(
    list => list.uid === state.selectedList
  );
  switch (type) {
    case AUTH_START:
      return {
        ...state,
        loading: true,
      };

    case AUTHENTICATION:
      return {
        ...state,
        user: payload,
        loading: false,
        error: false,
      };
    case AUTH_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case FETCH_DATA:
      return {
        ...state,
        lists: payload.lists,
        dataFetched: true,
      };
    case SIGN_OUT:
      return initialState;
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
    case DELETE_LIST:
      const newList = state.lists.filter(list => list.uid !== payload);

      return {
        ...state,
        lists: newList,
      };

    case SELECT_EXPENSES:
      return {
        ...state,
        selectedExpences: payload,
      };
    case SET_FILTERS:
      const updatedListsFilters = state.lists.map(list =>
        list.uid === state.selectedList ? { ...list, filters: payload } : list
      );
      return {
        ...state,
        lists: updatedListsFilters,
      };
    case ADD_EXPENSES:
      const selectedList = state.lists.find(
        list => list.uid === state.selectedList
      );
      const updatedExpenses = selectedList?.expenses
        ? [...selectedList.expenses, payload]
        : [payload];
      const updatedLists = state.lists.map(list =>
        list.uid === state.selectedList
          ? { ...list, expenses: updatedExpenses }
          : list
      );

      return {
        ...state,
        lists: updatedLists,
      };

    case SET_EXPENSES:
      const importedExpenses = [...selectedList.expenses, ...payload];

      const importedLists = state.lists.map(list =>
        list.uid === state.selectedList
          ? { ...list, expenses: importedExpenses }
          : list
      );

      return {
        ...state,
        lists: importedLists,
      };
    case UPDATE_EXPENSE_PENDING_AMOUNT:
      const { listId, expenseId } = payload;
      return {
        ...state,
        lists: state.lists.map(list => {
          if (list.uid === listId) {
            return {
              ...list,
              expenses: list.expenses.map(expense => {
                if (expense.id === expenseId) {
                  return {
                    ...expense,
                    pendingAmount: 0,
                  };
                }
                return expense;
              }),
            };
          }
          return list;
        }),
      };
    case DELETE_EXPENSE:
      const { listID, expenseID } = payload;

      return {
        ...state,
        lists: state.lists.map(list => {
          if (list.uid === listID) {
            return {
              ...list,
              expenses: list.expenses.filter(
                expense => expense.id !== expenseID
              ),
            };
          }
          return list;
        }),
      };
    default:
      return state;
  }
};
