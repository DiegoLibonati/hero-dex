import { Fragment } from "react/jsx-runtime";
import { Routes, Route, Navigate } from "react-router-dom";

import { CheckingAuth } from "../auth/components/CheckingAuth/CheckingAuth";
import { LoginPage } from "../auth/pages/LoginPage/LoginPage";
import { RegisterPage } from "../auth/pages/RegisterPage/RegisterPage";

import { useCheckAuth } from "../hooks/useCheckAuth";
import { HeroesRoutes } from "../heroes/routes/HeroesRoutes";

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
