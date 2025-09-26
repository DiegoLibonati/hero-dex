import { Hero } from "@src/entities/entities";

export const getHeroById = (idHero: string, heroes: Hero[]): Hero => {
  return heroes.find((hero) => hero.id === parseInt(idHero))!;
};
