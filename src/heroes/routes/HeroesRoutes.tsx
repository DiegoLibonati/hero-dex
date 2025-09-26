import { Fragment } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { NavBar } from "@src/ui/components/NavBar/NavBar";

import { SearchPage } from "@src/heroes/pages/SearchPage/SearchPage";
import { HeroPage } from "@src/heroes/pages/HeroPage/HeroPage";
import { HeroByPublisherPage } from "@src/heroes/pages/HeroByPublisherPage/HeroByPublisherPage";

import { HeroesProvider } from "@src/heroes/context/HeroesProvider";

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
