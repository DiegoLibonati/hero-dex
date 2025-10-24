import { useEffect } from "react";

import { UseCheckAuth } from "@src/entities/hooks";

import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "@src/firebase/config";

import { useAuthContext } from "@src/hooks/useAuthContext";

export const useCheckAuth = (): UseCheckAuth => {
  const { state, dispatch } = useAuthContext();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user)
        return dispatch({ type: "AUTH_LOGOUT", payload: { errorMessage: "" } });

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

  return state.logged as string;
};
