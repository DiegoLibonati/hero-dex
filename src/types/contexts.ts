import { AuthState, HeroesState } from "@/types/states";
import { AuthReducer, HeroesReducer } from "@/types/reducers";

export type AuthContext = {
  state: AuthState;
  dispatch: React.Dispatch<AuthReducer>;
};

export type HeroesContext = {
  state: HeroesState;
  dispatch: React.Dispatch<HeroesReducer>;
};
