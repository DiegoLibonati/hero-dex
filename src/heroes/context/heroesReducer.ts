import { HeroesState, HeroesPayloadReducer } from "../../entities/entities";

import { getAllPublishers } from "../helpers/getAllPublishers";
import { getHeroesByName } from "../helpers/getHeroesByName";
import { getHeroesByPublishers } from "../helpers/getHeroesByPublishers";

export const heroesReducer = (
  state: HeroesState,
  action: HeroesPayloadReducer
) => {
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
