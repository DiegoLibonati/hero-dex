import { createContext } from "react";

import type { HeroesContext as HeroesContextT } from "@/types/contexts";

export const HeroesContext = createContext<HeroesContextT | null>(null);
