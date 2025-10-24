import { BrowserRouter } from "react-router-dom";

import { AuthErrorAlert } from "@src/components/AuthErrorAlert/AuthErrorAlert";

import { AuthProvider } from "@src/contexts/AuthContext/AuthContext";

import { AppRouter } from "@src/router/AppRouter";

export const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter></AppRouter>
      </BrowserRouter>

      <AuthErrorAlert></AuthErrorAlert>
    </AuthProvider>
  );
};
