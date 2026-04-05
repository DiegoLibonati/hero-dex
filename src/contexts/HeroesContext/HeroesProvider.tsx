import { useReducer } from "react";

import { HeroesProviderProps } from "@/types/props";

import { HeroesContext } from "@/contexts/HeroesContext/HeroesContext";
import { HeroesReducer } from "@/contexts/HeroesContext/HeroesReducer";

export const HeroesProvider = ({ children }: HeroesProviderProps) => {
  const [state, dispatch] = useReducer(HeroesReducer, {
    heroes: [],
    heroesCopy: [],
    publishers: [],
  });

  return (
    <HeroesContext.Provider
      value={{
        state: state,
        dispatch: dispatch,
      }}
    >
      {children}
    </HeroesContext.Provider>
  );
};
