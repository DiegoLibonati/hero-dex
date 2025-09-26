import { Fragment } from "react/jsx-runtime";
import { Routes, Route, Navigate } from "react-router-dom";

import { CheckingAuth } from "@src/auth/components/CheckingAuth/CheckingAuth";
import { LoginPage } from "@src/auth/pages/LoginPage/LoginPage";
import { RegisterPage } from "@src/auth/pages/RegisterPage/RegisterPage";

import { useCheckAuth } from "@src/hooks/useCheckAuth";
import { HeroesRoutes } from "@src/heroes/routes/HeroesRoutes";

export const AppRouter = (): JSX.Element => {
  const logged = useCheckAuth();

  if (logged === "checking") return <CheckingAuth></CheckingAuth>;

  return (
    <Routes>
      {logged === "authenticated" ? (
        <Route path="/*" element={<HeroesRoutes></HeroesRoutes>}></Route>
      ) : (
        <Fragment>
          <Route path="login" element={<LoginPage></LoginPage>}></Route>

          <Route
            path="register"
            element={<RegisterPage></RegisterPage>}
          ></Route>
        </Fragment>
      )}
      <Route path="/*" element={<Navigate to="/login"></Navigate>} />
    </Routes>
  );
};
