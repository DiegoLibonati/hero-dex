import type { AuthState, HeroesState } from "@/types/states";
import type { AuthReducer, HeroesReducer } from "@/types/reducers";

export interface AuthContext {
  state: AuthState;
  dispatch: React.Dispatch<AuthReducer>;
}

export interface HeroesContext {
  state: HeroesState;
  dispatch: React.Dispatch<HeroesReducer>;
}
