import { createContext } from "react";

import type { AuthContext as AuthContextT } from "@/types/contexts";

export const AuthContext = createContext<AuthContextT | null>(null);
