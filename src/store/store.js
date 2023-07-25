import { createContext } from 'react';

export const context = createContext();

export const initialState = {
  user: false,
  error: false,
  loading: false,
  selectedList: 'abc123',
  dataFetched: false,
  selectedExpnces: null,
  lists: [
    {
      uid: 'abc123',
      name: 'General Expenses',
      expenses: [],
      filters: {
        label: '',
        startDate: null,
        endDate: null,
      },
    },
  ],
};
('');
