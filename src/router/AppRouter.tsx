import { Routes, Route, Navigate } from "react-router-dom";

import { CheckingAuth } from "@src/components/CheckingAuth/CheckingAuth";

import { LoginPage } from "@src/pages/LoginPage/LoginPage";
import { RegisterPage } from "@src/pages/RegisterPage/RegisterPage";
import { HeroByPublisherPage } from "@src/pages/HeroByPublisherPage/HeroByPublisherPage";
import { SearchPage } from "@src/pages/SearchPage/SearchPage";
import { HeroPage } from "@src/pages/HeroPage/HeroPage";

import { AuthRoute } from "@src/router/AuthRoute";
import { HeroesRoute } from "@src/router/HeroesRoute";

import { useCheckAuth } from "@src/hooks/useCheckAuth";

export const AppRouter = (): JSX.Element => {
  const logged = useCheckAuth();

  if (logged === "checking") return <CheckingAuth></CheckingAuth>;

  return (
    <Routes>
      <Route element={<AuthRoute />}>
        <Route path="/auth/login" element={<LoginPage></LoginPage>}></Route>
        <Route
          path="/auth/register"
          element={<RegisterPage></RegisterPage>}
        ></Route>
      </Route>

      <Route element={<HeroesRoute />}>
        <Route
          path="/heroes/home"
          element={<HeroByPublisherPage></HeroByPublisherPage>}
        ></Route>
        <Route
          path="/heroes/search"
          element={<SearchPage></SearchPage>}
        ></Route>
        <Route
          path="/heroes/hero/:heroId"
          element={<HeroPage></HeroPage>}
        ></Route>
      </Route>

      <Route path="/*" element={<Navigate to="/auth/login"></Navigate>}></Route>
    </Routes>
  );
};
