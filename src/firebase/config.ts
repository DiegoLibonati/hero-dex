import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { CONFIG } from "@src/constants/config";

const FirebaseApp = initializeApp(CONFIG.firebase);
export const FirebaseAuth = getAuth(FirebaseApp);
