import type { Hero } from "@/types/app";

export const getHeroesByName = (name = "", heroes: Hero[]): Hero[] => {
  name = name.toLowerCase().trim();

  if (!name) return [];

  return heroes.filter((hero) => hero.name.toLowerCase().includes(name));
};
