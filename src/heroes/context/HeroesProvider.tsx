import { useReducer, useContext, useEffect } from "react";

import {
  HeroesState,
  HeroesContext as HeroesContextT,
  Hero,
} from "@src/entities/entities";

import { HeroesContext } from "@src/heroes/context/HeroesContext";
import { heroesReducer } from "@src/heroes/context/heroesReducer";
import { useFetch } from "@src/hooks/useFetch";

const initialState: HeroesState = {
  heroes: [],
  heroesCopy: [],
  publishers: [],
};

export const HeroesProvider = ({ children }: { children: React.ReactNode }) => {
  const [heroesState, dispatch] = useReducer(heroesReducer, initialState);

  const { data, loading } = useFetch<Hero>("/superhero-api/api/all.json");

  const handleSetHeroes = (heroes: Hero[]): void => {
    dispatch({ type: "SET_HEROES", payload: heroes });
  };

  const handleSetPublisher = (publisher: string): void => {
    dispatch({ type: "SET_PUBLISHER", payload: publisher });
  };

  const handleSearchHeroes = (search: string) => {
    dispatch({ type: "SET_HEROES_BY_NAME", payload: search });
  };

  useEffect(() => {
    handleSetHeroes(data);
  }, [data]);

  return (
    <HeroesContext.Provider
      value={{
        heroesState: heroesState,
        loading: loading,
        handleSetPublisher: handleSetPublisher,
        handleSearchHeroes: handleSearchHeroes,
      }}
    >
      {children}
    </HeroesContext.Provider>
  );
};

export const useHeroesContext = (): HeroesContextT => {
  return useContext(HeroesContext)!;
};
