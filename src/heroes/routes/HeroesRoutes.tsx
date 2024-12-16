import { Fragment } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { NavBar } from "../../ui/components/NavBar/NavBar";

import { SearchPage } from "../pages/SearchPage/SearchPage";
import { HeroPage } from "../pages/HeroPage/HeroPage";
import { HeroByPublisherPage } from "../pages/HeroByPublisherPage/HeroByPublisherPage";

import { HeroesProvider } from "../context/HeroesProvider";

export const HeroesRoutes = (): JSX.Element => {
  return (
    <Fragment>
      <NavBar></NavBar>

      <HeroesProvider>
        <main>
          <Routes>
            <Route
              path="/index"
              element={<HeroByPublisherPage></HeroByPublisherPage>}
            ></Route>
            <Route path="/search" element={<SearchPage></SearchPage>}></Route>
            <Route path="/hero/:heroId" element={<HeroPage></HeroPage>}></Route>

            {/* Mas... */}
            <Route
              path="/*"
              element={<Navigate to="/index"></Navigate>}
            ></Route>
          </Routes>
        </main>
      </HeroesProvider>
    </Fragment>
  );
};
