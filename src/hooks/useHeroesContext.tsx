import { useContext } from "react";

import { UseHeroesContext } from "@src/entities/hooks";

import { HeroesContext } from "@src/contexts/HeroesContext/HeroesContext";

export const useHeroesContext = (): UseHeroesContext => {
  const context = useContext(HeroesContext);
  if (!context) {
    throw new Error("useHeroesContext must be used within HeroesProvider");
  }
  return context;
};
