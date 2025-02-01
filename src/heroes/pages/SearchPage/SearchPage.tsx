import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

import { HeroCard } from "../../components/HeroCard/HeroCard";

import { useHeroesContext } from "../../context/HeroesProvider";
import { useForm } from "../../../hooks/useForm";

import "./SearchPage.css";

export const SearchPage = (): JSX.Element => {
  const { heroesState, handleSearchHeroes } = useHeroesContext();

  const navigate = useNavigate();
  const location = useLocation();

  const { q = "" } = queryString.parse(location.search);

  const { formState, onInputChange } = useForm<{ searchText: string }>({
    searchText: q as string,
  });

  useEffect(() => {
    const heroName = q as string;

    handleSearchHeroes(heroName);
  }, [q]);

  const onSearchSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const heroName = formState.searchText.trim();

    navigate(`?q=${heroName}`);
  };

  return (
    <section className="search-page">
      <h1 className="search-page__title">Search your favorite HERO</h1>

      <form onSubmit={onSearchSubmit} className="search-page__form">
        <input
          type="text"
          placeholder="Search a hero"
          name="searchText"
          autoComplete="off"
          className="search-page__form-input"
          value={formState.searchText}
          onChange={onInputChange}
        />

        <button
          type="submit"
          aria-label="search"
          className="search-page__form-submit"
        >
          Search
        </button>
      </form>

      <article className="search-page__list">
        <h4 className="search-page__default-label">Results</h4>

        <div
          className="search-page__search-label"
          style={{ display: q === "" ? "" : "none" }}
        >
          Search a hero
        </div>

        {heroesState.heroes.length === 0 && q !== "" && (
          <div className="search-page__not-found-label">
            No hero with <b className="search-page__query-label">{q}</b>
          </div>
        )}

        {heroesState.heroes.length > 0 &&
          q !== "" &&
          heroesState.heroes.map((hero) => (
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
      </article>
    </section>
  );
};
