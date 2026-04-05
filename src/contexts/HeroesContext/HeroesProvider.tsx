import { useReducer } from "react";

import type { JSX } from "react";
import type { HeroesProviderProps } from "@/types/props";

import { HeroesContext } from "@/contexts/HeroesContext/HeroesContext";
import { HeroesReducer } from "@/contexts/HeroesContext/HeroesReducer";

export const HeroesProvider = ({ children }: HeroesProviderProps): JSX.Element => {
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
