import { Hero } from "@src/entities/app";

export const getAllPublishers = (heroes: Hero[]): string[] => {
  const publishers: string[] = [];

  heroes.forEach((hero) => {
    if (publishers.includes(hero.biography.publisher)) return;
    publishers.push(hero.biography.publisher);
  });

  return publishers.filter((publisher) => publisher);
};
