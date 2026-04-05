import { useContext } from "react";

import { UseHeroesContext } from "@/types/hooks";

import { HeroesContext } from "@/contexts/HeroesContext/HeroesContext";

export const useHeroesContext = (): UseHeroesContext => {
  const context = useContext(HeroesContext);
  if (!context) {
    throw new Error("useHeroesContext must be used within HeroesProvider");
  }
  return context;
};
