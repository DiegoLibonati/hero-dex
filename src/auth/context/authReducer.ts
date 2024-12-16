import { AuthPayloadReducer, AuthState } from "../../entities/entities";

export const authReducer = (state: AuthState, action: AuthPayloadReducer) => {
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
      return state;
  }
};
