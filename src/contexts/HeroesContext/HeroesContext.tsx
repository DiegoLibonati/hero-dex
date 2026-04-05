import { createContext } from "react";

import { HeroesContext as HeroesContextT } from "@/types/contexts";

export const HeroesContext = createContext<HeroesContextT | null>(null);
