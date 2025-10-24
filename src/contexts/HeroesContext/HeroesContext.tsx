import React, { useReducer } from "react";

import { HeroesProviderProps } from "@src/entities/props";
import { HeroesContext as HeroesContextT } from "@src/entities/contexts";

import {
  initialState,
  HeroesReducer,
} from "@src/contexts/HeroesContext/HeroesReducer";

export const HeroesContext = React.createContext<HeroesContextT | null>(null);

export const HeroesProvider = ({ children }: HeroesProviderProps) => {
  const [state, dispatch] = useReducer(HeroesReducer, initialState);

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
