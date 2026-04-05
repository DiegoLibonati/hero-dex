import { useEffect, useState } from "react";

import { Hero } from "@/types/app";
import { HeroListProps } from "@/types/props";

import HeroCard from "@/components/HeroCard/HeroCard";

import "@/components/HeroList/HeroList.css";

const HeroList = ({ heroes, quantity }: HeroListProps) => {
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
    <section className="cards-wrapper">
      <ul className="cards">
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
          aria-label="Load more heroes"
          className="cards-wrapper__btn-show-more"
        >
          Show More
        </button>
      )}
    </section>
  );
};

export default HeroList;
