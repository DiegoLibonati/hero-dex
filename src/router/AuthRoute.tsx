import { Navigate, Outlet } from "react-router-dom";

import { useCheckAuth } from "@src/hooks/useCheckAuth";

export const AuthRoute = (): JSX.Element => {
  const logged = useCheckAuth();

  return logged !== "authenticated" ? (
    <Outlet />
  ) : (
    <Navigate to="/heroes/home" replace />
  );
};
