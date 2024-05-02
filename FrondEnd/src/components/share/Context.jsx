import { createContext, useReducer } from 'react';




// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isLoggedIn:true, user: action.payload.user, token: action.payload.token };
    case "LOGOUT":
     
    return { ...state,isLoggedIn:false, user: null, token: null };

    default:
      return state;
  }
};

// Initial state
const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,


};

// Create context
export const AuthContext = createContext();

// Context provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};


