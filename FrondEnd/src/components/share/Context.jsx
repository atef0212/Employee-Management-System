import { createContext, useReducer, useState } from 'react';


// Initial state
const initialState = {
  isLoggedIn: false,
  user: null,
  refreshToken:null,
  token: null,


};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isLoggedIn:true, refreshToken:action.payload.refreshToken,user:action.payload.user, token: action.payload.token };
    case "LOGOUT":
     
    return { ...state,isLoggedIn:false, user: null, token: null };

    default:
      return state;
  }
};



// Create context
export const AuthContext = createContext();

// Context provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const token=state.token
 const user=state.user
  // const role=state.role
  // const isLoggedIn=state.isLoggedIn

  return (
    <AuthContext.Provider value={{  dispatch, token, user, state }}>
      {children}
    </AuthContext.Provider>
  );
};


