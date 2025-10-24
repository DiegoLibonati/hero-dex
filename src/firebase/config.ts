import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import envs from "@src/constants/envs";

const FirebaseApp = initializeApp(envs.firebase);
export const FirebaseAuth = getAuth(FirebaseApp);
