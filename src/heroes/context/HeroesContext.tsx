import { createContext } from "react";

import { HeroesContext as HeroesContextT } from "../../entities/entities";

export const HeroesContext = createContext<HeroesContextT | null>(null);
