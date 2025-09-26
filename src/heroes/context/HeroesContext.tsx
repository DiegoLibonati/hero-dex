import { createContext } from "react";

import { HeroesContext as HeroesContextT } from "@src/entities/entities";

export const HeroesContext = createContext<HeroesContextT | null>(null);
