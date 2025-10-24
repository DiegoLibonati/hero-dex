import { useEffect } from "react";

import { useAuthContext } from "@src/hooks/useAuthContext";

import "@src/components/AuthErrorAlert/AuthErrorAlert.css";

export const AuthErrorAlert = (): JSX.Element => {
  const { state: authState, dispatch: authDispatch } = useAuthContext();

  useEffect(() => {
    if (!authState.errorMessage) return;

    const timeout = setTimeout(() => {
      authDispatch({ type: "CLEAR_ERROR_MESSAGE" });
    }, 2000);

    return () => clearTimeout(timeout);
  }, [authState?.errorMessage]);

  return (
    <div
      className={`alert-login ${authState?.errorMessage && "alert-login--open"}`}
    >
      {authState?.errorMessage}
    </div>
  );
};
