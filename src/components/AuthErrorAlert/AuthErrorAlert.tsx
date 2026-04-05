import { useEffect } from "react";

import type { JSX } from "react";

import { useAuthContext } from "@/hooks/useAuthContext";

import "@/components/AuthErrorAlert/AuthErrorAlert.css";

const AuthErrorAlert = (): JSX.Element => {
  const { state: authState, dispatch: authDispatch } = useAuthContext();

  useEffect(() => {
    if (!authState.errorMessage) return;

    const timeout = setTimeout(() => {
      authDispatch({ type: "CLEAR_ERROR_MESSAGE" });
    }, 2000);

    return (): void => {
      clearTimeout(timeout);
    };
  }, [authState.errorMessage]);

  return (
    <div className={`alert-login ${authState.errorMessage && "alert-login--open"}`}>
      {authState.errorMessage}
    </div>
  );
};

export default AuthErrorAlert;
