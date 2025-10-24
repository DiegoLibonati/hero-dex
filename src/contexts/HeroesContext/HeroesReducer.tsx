import { HeroesReducer as HeroesReducerT } from "@src/entities/contexts";
import { HeroesState } from "@src/entities/states";

import { getAllPublishers } from "@src/helpers/getAllPublishers";
import { getHeroesByName } from "@src/helpers/getHeroesByName";
import { getHeroesByPublishers } from "@src/helpers/getHeroesByPublishers";

export const initialState: HeroesState = {
  heroes: [],
  heroesCopy: [],
  publishers: [],
};

export const HeroesReducer = (state: HeroesState, action: HeroesReducerT) => {
  switch (action.type) {
    case "SET_HEROES":
      const heroes = action.payload;

      return {
        ...state,
        heroes: heroes,
        heroesCopy: heroes,
        publishers: getAllPublishers(heroes),
      };

    case "SET_PUBLISHER":
      const publisher = action.payload;

      return {
        ...state,
        heroes: getHeroesByPublishers(publisher, state.heroesCopy),
      };

    case "SET_HEROES_BY_NAME":
      const heroName = action.payload;

      return { ...state, heroes: getHeroesByName(heroName, state.heroesCopy) };

    default:
      return state;
  }
};
