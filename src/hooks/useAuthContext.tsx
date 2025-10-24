import { useContext } from "react";

import { UseAuthContext } from "@src/entities/hooks";

import { AuthContext } from "@src/contexts/AuthContext/AuthContext";

export const useAuthContext = (): UseAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};
