import { useContext } from "react";

import { UseAuthContext } from "@/types/hooks";

import { AuthContext } from "@/contexts/AuthContext/AuthContext";

export const useAuthContext = (): UseAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};
