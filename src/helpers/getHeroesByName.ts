import { Hero } from "@src/entities/app";

export const getHeroesByName = (name: string = "", heroes: Hero[]): Hero[] => {
  name = name.toLowerCase().trim();

  if (!name) return [];

  return heroes.filter((hero) => hero.name.toLowerCase().includes(name));
};
