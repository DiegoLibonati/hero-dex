import { AuthContext, HeroesContext } from "@/types/contexts";

export type UseAuthContext = AuthContext;
export type UseHeroesContext = HeroesContext;

export type UseCheckAuth = string;

export type UseForm<T> = {
  formState: T;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onResetForm: () => void;
};
