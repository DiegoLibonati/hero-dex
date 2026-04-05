import { Routes, Route, Navigate } from "react-router-dom";

import type { JSX } from "react";

import CheckingAuth from "@/components/CheckingAuth/CheckingAuth";

import LoginPage from "@/pages/LoginPage/LoginPage";
import RegisterPage from "@/pages/RegisterPage/RegisterPage";
import HeroByPublisherPage from "@/pages/HeroByPublisherPage/HeroByPublisherPage";
import SearchPage from "@/pages/SearchPage/SearchPage";
import HeroPage from "@/pages/HeroPage/HeroPage";

import { PublicRoute } from "@/router/PublicRoute";
import { PrivateRoute } from "@/router/PrivateRoute";

import { useCheckAuth } from "@/hooks/useCheckAuth";

export const HeroesRouter = (): JSX.Element => {
  const logged = useCheckAuth();

  if (logged === "checking") return <CheckingAuth></CheckingAuth>;

  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<HeroByPublisherPage></HeroByPublisherPage>}></Route>
        <Route path="/search" element={<SearchPage></SearchPage>}></Route>
        <Route path="/hero/:heroId" element={<HeroPage></HeroPage>}></Route>
      </Route>

      <Route path="/*" element={<Navigate to="/login"></Navigate>}></Route>
    </Routes>
  );
};
