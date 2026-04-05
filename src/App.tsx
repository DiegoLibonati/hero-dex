import { HashRouter } from "react-router-dom";

import type { JSX } from "react";

import { AuthProvider } from "@/contexts/AuthContext/AuthProvider";

import { HeroesRouter } from "@/router/HeroesRouter";

const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <HashRouter>
        <HeroesRouter></HeroesRouter>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
