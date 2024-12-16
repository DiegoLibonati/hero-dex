import { useContext, useReducer } from "react";

import {
  AuthState,
  User,
  UserLogin,
  UserLoginWithoutUsername,
  AuthContext as AuthContextT,
} from "../../entities/entities";

import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";

import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmail,
  signInWithGoogle,
} from "../../firebase/providers";

const initialState: AuthState = {
  logged: "checking",
  uid: "",
  email: "",
  displayName: "",
  photoURL: "",
  errorMessage: "",
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  const login = (payload: User): void => {
    dispatch({ type: "AUTH_LOGIN", payload: payload });
  };

  const logout = (errorMessage: string = ""): void => {
    dispatch({ type: "AUTH_LOGOUT", payload: { errorMessage: errorMessage } });
  };

  const checkingAuthentication = (status: string): void => {
    dispatch({ type: "CHECKING_CREDENTIALS", payload: status });
  };

  const clearErrorMessage = (): void => {
    dispatch({ type: "CLEAR_ERROR_MESSAGE" });
  };

  const startGoogleSignIn = async (status: string): Promise<void> => {
    dispatch({ type: "CHECKING_CREDENTIALS", payload: status });

    const result = await signInWithGoogle();

    if (!result.ok) return logout(result.errorMessage);

    const user: User = {
      uid: result.uid,
      displayName: result.displayName,
      email: result.email,
      photoURL: result.photoURL,
    };

    login(user);
  };

  const startCreatingUserWithEmail = async (
    status: string,
    userLogin: UserLogin
  ): Promise<void> => {
    const { email, password, username } = userLogin;

    dispatch({ type: "CHECKING_CREDENTIALS", payload: status });

    const result = await registerUserWithEmail(email, password, username);

    if (!result.ok) return logout(result.errorMessage);

    const user: User = {
      uid: result.uid,
      displayName: result.displayName,
      email: result.email,
      photoURL: result.photoURL,
    };

    login(user);
  };

  const startLoginWithEmailPassword = async (
    status: string,
    userLogin: UserLoginWithoutUsername
  ): Promise<void> => {
    const { email, password } = userLogin;

    dispatch({ type: "CHECKING_CREDENTIALS", payload: status });

    const result = await loginWithEmailPassword(email, password);

    if (!result.ok) return logout(result.errorMessage);

    const user: User = {
      uid: result.uid,
      displayName: result.displayName,
      email: result.email,
      photoURL: result.photoURL,
    };

    login(user);
  };

  const startLogOutWithButton = async (): Promise<void> => {
    await logoutFirebase();
    logout();
  };

  return (
    <AuthContext.Provider
      value={{
        authState: authState,
        checkingAuthentication: checkingAuthentication,
        startGoogleSignIn: startGoogleSignIn,
        login: login,
        logout: logout,
        startCreatingUserWithEmail: startCreatingUserWithEmail,
        startLoginWithEmailPassword: startLoginWithEmailPassword,
        startLogOutWithButton: startLogOutWithButton,
        clearErrorMessage: clearErrorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextT => {
  return useContext(AuthContext)!;
};
