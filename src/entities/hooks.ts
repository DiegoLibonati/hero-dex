import { AuthContext, HeroesContext } from "@src/entities/contexts";

export type UseAuthContext = AuthContext;

export type UseCheckAuth = string;

export type UseForm<T> = {
  formState: T;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onResetForm: () => void;
};

export type UseHeroesContext = HeroesContext;
