import { createContext, useReducer, useState } from 'react';




// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isLoggedIn:true, role:action.payload.role,userId:action.payload.userId, token: action.payload.token };
    case "LOGOUT":
     
    return { ...state,isLoggedIn:false, user: null, token: null };

    default:
      return state;
  }
};

// Initial state
const initialState = {
  isLoggedIn: false,
  userId: null,
  role:null,
  token: null,


};

// Create context
export const AuthContext = createContext();

// Context provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const token=state.token
 const userId=state.userId
  // const role=state.role
  // const isLoggedIn=state.isLoggedIn

  return (
    <AuthContext.Provider value={{  dispatch, token, userId }}>
      {children}
    </AuthContext.Provider>
  );
};


