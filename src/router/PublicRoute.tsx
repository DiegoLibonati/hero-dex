import { Fragment } from "react/jsx-runtime";
import { Navigate, Outlet } from "react-router-dom";

import AuthErrorAlert from "@/components/AuthErrorAlert/AuthErrorAlert";

import { useCheckAuth } from "@/hooks/useCheckAuth";

export const PublicRoute = () => {
  const status = useCheckAuth();

  return status !== "authenticated" ? (
    <Fragment>
      <Outlet></Outlet>
      <AuthErrorAlert></AuthErrorAlert>
    </Fragment>
  ) : (
    <Navigate to="/home" replace />
  );
};
