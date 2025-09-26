import { AuthErrorAlert } from "@src/auth/components/AuthErrorAlert/AuthErrorAlert";

import { AppRouter } from "@src/router/AppRouter";
import { AuthProvider } from "@src/auth/context/AuthProvider";

import "animate.css";

export const HeroesApp = (): JSX.Element => {
  return (
    <AuthProvider>
      <AppRouter></AppRouter>
      <AuthErrorAlert></AuthErrorAlert>
    </AuthProvider>
  );
};
