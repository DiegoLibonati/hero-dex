import { useReducer } from "react";

import type { JSX } from "react";
import type { AuthProviderProps } from "@/types/props";

import { AuthContext } from "@/contexts/AuthContext/AuthContext";
import { AuthReducer } from "@/contexts/AuthContext/AuthReducer";

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(AuthReducer, {
    logged: "checking",
    uid: "",
    email: "",
    displayName: "",
    photoURL: "",
    errorMessage: "",
  });

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
