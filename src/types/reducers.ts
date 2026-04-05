import { Hero, User } from "@/types/app";

export type AuthReducer =
  | { type: "AUTH_LOGOUT"; payload: { errorMessage: string } }
  | { type: "AUTH_LOGIN"; payload: User }
  | { type: "CHECKING_CREDENTIALS"; payload: string }
  | { type: "CLEAR_ERROR_MESSAGE" };

export type HeroesReducer =
  | { type: "SET_HEROES"; payload: Hero[] }
  | { type: "SET_PUBLISHER"; payload: string }
  | { type: "SET_HEROES_BY_NAME"; payload: string };
