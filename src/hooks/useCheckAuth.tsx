import { useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "@src/firebase/config";

import { useAuthContext } from "@src/auth/context/AuthProvider";

export const useCheckAuth = (): string => {
  const { authState, login, logout } = useAuthContext();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return logout();

      const { uid, email, displayName, photoURL } = user;

      login({
        uid: uid,
        email: email!,
        displayName: displayName!,
        photoURL: photoURL!,
      });
    });
  }, []);

  return authState.logged as string;
};
