import { useEffect } from "react";

import type { UseCheckAuth } from "@/types/hooks";

import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "@/firebase/config";

import { useAuthContext } from "@/hooks/useAuthContext";

export const useCheckAuth = (): UseCheckAuth => {
  const { state, dispatch } = useAuthContext();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (user) => {
      if (!user) {
        dispatch({ type: "AUTH_LOGOUT", payload: { errorMessage: "" } });
        return;
      }

      const { uid, email, displayName, photoURL } = user;

      dispatch({
        type: "AUTH_LOGIN",
        payload: {
          uid: uid,
          email: email!,
          displayName: displayName!,
          photoURL: photoURL!,
        },
      });
    });
  }, []);

  return state.logged;
};
