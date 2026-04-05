import { Hero, User } from "@/types/app";

export type AuthState = {
  logged: string;
  errorMessage: string;
} & User;

export type HeroesState = {
  heroes: Hero[];
  heroesCopy: Hero[];
  publishers: string[];
};
