import { HeroesReducer as HeroesReducerT } from "@/types/reducers";
import { HeroesState } from "@/types/states";

import { getAllPublishers } from "@/helpers/getAllPublishers";
import { getHeroesByName } from "@/helpers/getHeroesByName";
import { getHeroesByPublishers } from "@/helpers/getHeroesByPublishers";

export const HeroesReducer = (state: HeroesState, action: HeroesReducerT): HeroesState => {
  switch (action.type) {
    case "SET_HEROES":
      return {
        ...state,
        heroes: action.payload,
        heroesCopy: action.payload,
        publishers: getAllPublishers(action.payload),
      };

    case "SET_PUBLISHER":
      return {
        ...state,
        heroes: getHeroesByPublishers(action.payload, state.heroesCopy),
      };

    case "SET_HEROES_BY_NAME":
      return { ...state, heroes: getHeroesByName(action.payload, state.heroesCopy) };

    default:
      throw new Error("Unknown action: " + (action as HeroesReducerT)?.type);
  }
};
