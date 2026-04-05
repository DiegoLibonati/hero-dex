import { Fragment } from "react/jsx-runtime";
import { Navigate, Outlet } from "react-router-dom";

import type { JSX } from "react";

import NavBar from "@/components/NavBar/NavBar";

import { HeroesProvider } from "@/contexts/HeroesContext/HeroesProvider";

import { useCheckAuth } from "@/hooks/useCheckAuth";

export const PrivateRoute = (): JSX.Element => {
  const status = useCheckAuth();

  return status === "authenticated" ? (
    <Fragment>
      <NavBar></NavBar>

      <HeroesProvider>
        <Outlet />
      </HeroesProvider>
    </Fragment>
  ) : (
    <Navigate to="/login" replace />
  );
};
