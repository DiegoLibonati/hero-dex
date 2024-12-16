import { Hero } from "../../entities/entities";

export const getHeroById = (idHero: string, heroes: Hero[]): Hero => {
  return heroes.find((hero) => hero.id === parseInt(idHero))!;
};
