import { createContext } from 'react';

export const context = createContext();

export const initialState = {
  lists: [
    {
      uid: 'abc123',
      name: 'General Expanses',
      expanses: [],
    },
  ],
};
