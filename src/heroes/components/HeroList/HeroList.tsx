import { useEffect, useState } from "react";

import { Hero } from "../../../entities/entities";

import { HeroCard } from "./../HeroCard/HeroCard";

import "./HeroList.css";

interface HeroListProps {
  heroes: Hero[];
  quantity: number;
}

export const HeroList = ({ heroes, quantity }: HeroListProps): JSX.Element => {
  const [heroesSliced, setHeroesSliced] = useState<Hero[]>([]);

  const handleShowMoreHeroes = (): void => {
    const currentHeroesQuantityShowing = heroesSliced.length;
    const heroesQuantityToShow = currentHeroesQuantityShowing + quantity;

    setHeroesSliced(heroes.slice(0, heroesQuantityToShow));
  };

  useEffect(() => {
    setHeroesSliced(heroes.slice(0, quantity));
  }, [heroes]);

  return (
    <section className="section_cards">
      <ul className="cards_container">
        {heroesSliced.map((hero) => (
          <HeroCard
            key={hero.id}
            biography={{
              fullName: hero.biography.fullName,
              publisher: hero.biography.publisher,
            }}
            id={hero.id}
            images={{ lg: hero.images.lg }}
            name={hero.name}
            slug={hero.slug}
          ></HeroCard>
        ))}
      </ul>

      {heroes.length !== heroesSliced.length && (
        <button
          type="button"
          onClick={handleShowMoreHeroes}
          aria-label="show more heroes"
          className="button-show-more-heroes"
        >
          Show More
        </button>
      )}
    </section>
  );
};
