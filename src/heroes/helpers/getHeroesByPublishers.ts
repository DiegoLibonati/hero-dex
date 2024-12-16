import { Hero } from "../../entities/entities";

export const getHeroesByPublishers = (
  publisher: string,
  heroes: Hero[]
): Hero[] => {
  const publisherLower = publisher.toLowerCase();

  if (publisherLower === "all" || !publisherLower) return heroes;

  return heroes.filter((hero) => {
    if (!hero.biography.publisher) return;

    return hero.biography.publisher.toLowerCase() === publisherLower;
  });
};
