import { AuthErrorAlert } from "./auth/components/AuthErrorAlert/AuthErrorAlert";

import { AppRouter } from "./router/AppRouter";
import { AuthProvider } from "./auth/context/AuthProvider";

import "animate.css";

export const HeroesApp = (): JSX.Element => {
  return (
    <AuthProvider>
      <AppRouter></AppRouter>
      <AuthErrorAlert></AuthErrorAlert>
    </AuthProvider>
  );
};
