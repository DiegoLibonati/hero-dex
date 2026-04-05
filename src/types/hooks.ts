import type { AuthContext, HeroesContext } from "@/types/contexts";

export type UseAuthContext = AuthContext;
export type UseHeroesContext = HeroesContext;

export type UseCheckAuth = string;

export interface UseForm<T> {
  formState: T;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onResetForm: () => void;
}
