import { Hero } from "@/types/app";

export const getHeroById = (idHero: string, heroes: Hero[]): Hero => {
  return heroes.find((hero) => hero.id === parseInt(idHero))!;
};
