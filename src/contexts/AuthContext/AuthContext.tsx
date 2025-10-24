import React, { useReducer } from "react";

import { AuthProviderProps } from "@src/entities/props";
import { AuthContext as AuthContextT } from "@src/entities/contexts";

import {
  initialState,
  AuthReducer,
} from "@src/contexts/AuthContext/AuthReducer";

export const AuthContext = React.createContext<AuthContextT | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        state: state,
        dispatch: dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};