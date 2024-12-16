import { createContext } from "react";

import { AuthContext as AuthContextT } from "../../entities/entities";

export const AuthContext = createContext<AuthContextT | null>(null);
