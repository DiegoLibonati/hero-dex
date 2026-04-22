import { HashRouter } from "react-router-dom";

import type { JSX } from "react";

import { AuthProvider } from "@/contexts/AuthContext/AuthProvider";

import { HeroDexRouter } from "@/router/HeroDexRouter";

const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <HashRouter>
        <HeroDexRouter></HeroDexRouter>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
