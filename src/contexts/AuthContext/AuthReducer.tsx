import { AuthReducer as AuthReducerT } from "@src/entities/contexts";
import { AuthState } from "@src/entities/states";

export const initialState: AuthState = {
  logged: "checking",
  uid: "",
  email: "",
  displayName: "",
  photoURL: "",
  errorMessage: "",
};

export const AuthReducer = (state: AuthState, action: AuthReducerT) => {
  switch (action.type) {
    case "AUTH_LOGIN":
      return {
        ...state,
        logged: "authenticated",
        uid: action.payload.uid,
        displayName: action.payload.displayName,
        photoURL: action.payload.photoURL,
        email: action.payload.email,
      };
    case "AUTH_LOGOUT":
      return {
        ...state,
        logged: "not-authenticated",
        uid: "",
        displayName: "",
        photoURL: "",
        email: "",
        errorMessage: action.payload.errorMessage,
      };
    case "CHECKING_CREDENTIALS":
      return {
        ...state,
        logged: action.payload,
      };
    case "CLEAR_ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: "",
      };
    default:
      throw new Error("Unknown action: " + (action as AuthReducerT)?.type);
  }
};
