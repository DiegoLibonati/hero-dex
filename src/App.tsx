import { HashRouter } from "react-router-dom";

import { AuthProvider } from "@/contexts/AuthContext/AuthProvider";

import { HeroesRouter } from "@/router/HeroesRouter";

const App = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <HeroesRouter></HeroesRouter>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
