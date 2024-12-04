import { v4 } from 'uuid';
import {
  AUTH_START,
  AUTHENTICATION,
  AUTH_FAILED,
  SIGN_OUT,
  SET_PROFILE,
  FETCH_DATA,
  ADD_TRANSACTION,
  DELETE_TRANSACTION,
  SET_MONTHLY_BUDGET,
  CREATE_PERSONAL_LIST,
  DELETE_PERSONAL_LIST,
  ADD_SAVED_TRANSACTION,
  DELETE_SAVED_TRANSACTION,
} from './actions.types';
import { initialState } from './store';

export default (state, { type, payload }) => {
  switch (type) {
    case AUTH_START:
      return { ...state, loading: true };

    case AUTHENTICATION:
      return {
        ...state,
        user: payload,
        profile: {
          ...state.profile,
          email: payload.email,
        },
        loading: false,
        dataFetched: true,
        error: null,
      };

    case AUTH_FAILED:
      return { ...state, loading: false, error: payload };

    case SIGN_OUT:
      return initialState;

    case FETCH_DATA:
      return { ...state, ...initialState, ...payload };

    case SET_PROFILE:
      return { ...state, profile: { ...state.profile, ...payload } };

    case ADD_TRANSACTION: {
      const { pId, mId, transection } = payload;
      const { date, amount, type, listType } = transection;

      const transactionDate = new Date(date);

      const month = (transactionDate.getMonth() + 1)
        .toString()
        .padStart(2, '0');
      const year = transactionDate.getFullYear();

      const monthYear = Number(`${month}${year}`);

      if (listType === 'monthly') {
        const updatedMonthlyData = state.financialData.monthlyData
          ? state.financialData.monthlyData.map(item => {
              if (item.mId === mId) {
                return {
                  ...item,
                  planned: item.planned,
                  actual:
                    type === 'income'
                      ? item.actual + amount
                      : item.actual - amount,
                  income:
                    type === 'income' ? item.income + amount : item.income,
                  expenses:
                    type === 'expenses'
                      ? item.expenses + amount
                      : item.expenses,
                };
              }
              return item;
            })
          : [];

        const existingMonthData =
          state.financialData.monthlyData?.find(item => item.mId === mId) ||
          null;

        if (!existingMonthData) {
          updatedMonthlyData.push({
            mId: v4(),
            monthYear,
            planned: 0,
            actual: amount,
            income: type === 'income' ? amount : 0,
            expenses: type === 'expenses' ? amount : 0,
          });
        }

        return {
          ...state,
          financialData: {
            ...state.financialData,
            transactions: state.financialData.transactions
              ? [...state.financialData.transactions, transection]
              : [transection],
            monthlyData: updatedMonthlyData,
          },
        };
      }

      if (listType === 'personal') {
        const existingPersonalList = state.financialData.personalLists?.find(
          list => list.pId === pId
        );

        const updatedPersonalLists = state.financialData.personalLists.map(
          list => {
            if (list.pId === pId) {
              return {
                ...list,
                actual: list.actual + (type === 'income' ? amount : -amount),
                income: type === 'income' ? list.income + amount : list.income,
                expenses:
                  type === 'expenses' ? list.expenses + amount : list.expenses,
                transactions: [...(list.transactions || []), transection],
              };
            }
            return list;
          }
        );

        if (!existingPersonalList) {
          updatedPersonalLists.push({
            pId: v4(),
            name: `Personal List ${
              state.financialData.personalLists.length + 1
            }`,
            planned: 0,
            actual: amount,
            income: type === 'income' ? amount : 0,
            expenses: type === 'expenses' ? amount : 0,
            transactions: [transection],
          });
        }

        return {
          ...state,
          financialData: {
            ...state.financialData,
            personalLists: updatedPersonalLists,
          },
        };
      }

      return state;
    }

    case DELETE_TRANSACTION: {
      const { id, mId, pId } = payload;

      const transactionToDelete = mId
        ? state.financialData.transactions.find(tx => tx.uuid === id)
        : state.financialData.personalLists
            .find(list => list.pId === pId)
            ?.transactions.find(tx => tx.uuid === id);

      if (mId) {
        const updatedTransactions = state.financialData.transactions.filter(
          tx => tx.uuid !== id
        );

        const updatedMonthlyData = state.financialData.monthlyData.map(
          month => {
            if (month.mId === mId) {
              const adjustmentValue = transactionToDelete.amount;
              if (transactionToDelete.type === 'expenses') {
                return {
                  ...month,
                  expenses: month.expenses - adjustmentValue,
                  actual: month.actual + adjustmentValue,
                };
              } else if (transactionToDelete.type === 'income') {
                return {
                  ...month,
                  income: month.income - adjustmentValue,
                  actual: month.actual - adjustmentValue,
                };
              }
            }
            return month;
          }
        );

        return {
          ...state,
          financialData: {
            ...state.financialData,
            transactions: updatedTransactions,
            monthlyData: updatedMonthlyData,
          },
        };
      }

      if (pId) {
        const updatedPersonalLists = state.financialData.personalLists.map(
          list => {
            if (list.pId === pId) {
              const adjustmentValue = transactionToDelete.amount;
              return {
                ...list,
                expenses:
                  transactionToDelete.type === 'expenses'
                    ? list.expenses - adjustmentValue
                    : list.expenses,
                income:
                  transactionToDelete.type === 'income'
                    ? list.income - adjustmentValue
                    : list.income,
                actual:
                  transactionToDelete.type === 'income'
                    ? list.actual - adjustmentValue
                    : list.actual + adjustmentValue,
                transactions: list.transactions.filter(tx => tx.uuid !== id),
              };
            }
            return list;
          }
        );

        return {
          ...state,
          financialData: {
            ...state.financialData,
            personalLists: updatedPersonalLists,
          },
        };
      }

      return state;
    }

    case SET_MONTHLY_BUDGET:
      const { monthYear, planned } = payload;

      const { monthlyData } = state.financialData;

      const existingMonthDataIndex = monthlyData.findIndex(
        item => item.monthYear === monthYear
      );

      if (existingMonthDataIndex !== -1) {
        const updatedMonthlyData = [...monthlyData];
        updatedMonthlyData[existingMonthDataIndex] = {
          ...updatedMonthlyData[existingMonthDataIndex],
          planned,
        };

        return {
          ...state,
          financialData: {
            ...state.financialData,
            monthlyData: updatedMonthlyData,
          },
        };
      } else {
        const newMonthData = {
          mId: v4(),
          monthYear,
          planned,
          actual: 0,
          income: 0,
          expenses: 0,
        };

        return {
          ...state,
          financialData: {
            ...state.financialData,
            monthlyData: [...monthlyData, newMonthData],
          },
        };
      }

    case CREATE_PERSONAL_LIST: {
      const { name, pId } = payload;
      const newPersonalList = {
        pId,
        name,
        planned: 0,
        actual: 0,
        income: 0,
        expenses: 0,
        transactions: [],
      };

      return {
        ...state,
        financialData: {
          ...state.financialData,
          personalLists: [
            ...(state.financialData.personalLists || []),
            newPersonalList,
          ],
        },
      };
    }

    case DELETE_PERSONAL_LIST: {
      const { listId } = payload;

      return {
        ...state,
        financialData: {
          ...state.financialData,
          personalLists: state.financialData.personalLists.filter(
            list => list.pId !== listId
          ),
        },
      };
    }

    case ADD_SAVED_TRANSACTION:
      return {
        ...state,
        financialData: {
          ...state.financialData,
          savedTransactions: state.financialData.savedTransactions
            ? [...state.financialData.savedTransactions, payload]
            : [payload],
        },
      };

    case DELETE_SAVED_TRANSACTION:
      return {
        ...state,
        financialData: {
          ...state.financialData,
          savedTransactions: state.financialData.savedTransactions.filter(
            tx => tx.uuid !== payload
          ),
        },
      };

    default:
      return state;
  }
};
