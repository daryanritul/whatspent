import React, { useReducer } from 'react'
import { context, initialState } from './store/store'
import reducer from './store/reducer'
import App from './App'

const RootApp = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <context.Provider
    value={{
        state,dispatch
    }}
    >
        <App />
    </context.Provider>
  )
}

export default RootApp