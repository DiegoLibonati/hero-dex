import { Fragment } from "react/jsx-runtime";
import { Navigate, Outlet } from "react-router-dom";

import { NavBar } from "@src/components/NavBar/NavBar";

import { HeroesProvider } from "@src/contexts/HeroesContext/HeroesContext";

import { useCheckAuth } from "@src/hooks/useCheckAuth";

export const HeroesRoute = (): JSX.Element => {
  const logged = useCheckAuth();

  return logged === "authenticated" ? (
    <Fragment>
      <NavBar></NavBar>

      <HeroesProvider>
        <main>
          <Outlet />
        </main>
      </HeroesProvider>
    </Fragment>
  ) : (
    <Navigate to="/auth/login" replace />
  );
};
