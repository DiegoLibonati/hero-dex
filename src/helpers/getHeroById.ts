import type { Hero } from "@/types/app";

export const getHeroById = (idHero: string, heroes: Hero[]): Hero | undefined => {
  return heroes.find((hero) => hero.id === parseInt(idHero));
};
