import { Hero, User } from "@src/entities/app";

export type AuthState = {
  logged: string;
  errorMessage: string;
} & User;

export type HeroesState = {
  heroes: Hero[];
  heroesCopy: Hero[];
  publishers: string[];
};
