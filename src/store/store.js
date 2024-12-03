import { createContext } from 'react';

export const context = createContext();

export const initialState = {
  user: false,
  error: false,
  loading: false,
  dataFetched: false,
  profile: {
    name: {
      firstName: 'User',
      lastName: 'Name',
    },
    email: '',
    categories: {
      expenses: [
        'Food',
        'Gifts',
        'Health/Medical',
        'Home',
        'Transportation',
        'Personal',
        'Pets',
        'Utilities',
        'Travel',
        'Debt',
        'Other',
      ],
      income: ['Savings', 'Paycheck', 'Bonus', 'Interest', 'Other'],
    },
  },
  financialData: {
    monthlyData: [],
    personalLists: [],
    transactions: [],
    savedTransactions: [],
  },
};
