import { useEffect } from "react";

import { useAuthContext } from "../../context/AuthProvider";

import "./AuthErrorAlert.css";

export const AuthErrorAlert = (): JSX.Element => {
  const { authState, clearErrorMessage } = useAuthContext();

  useEffect(() => {
    if (!authState.errorMessage) return;

    const timeout = setTimeout(() => {
      clearErrorMessage();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [authState?.errorMessage]);

  return (
    <div
      className={`alert-login ${
        authState?.errorMessage && "alert-login--open"
      }`}
    >
      {authState?.errorMessage}
    </div>
  );
};
