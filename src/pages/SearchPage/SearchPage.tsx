import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

import type { JSX } from "react";

import HeroCard from "@/components/HeroCard/HeroCard";

import { useHeroesContext } from "@/hooks/useHeroesContext";
import { useForm } from "@/hooks/useForm";

import heroService from "@/services/heroService";

import "@/pages/SearchPage/SearchPage.css";

const SearchPage = (): JSX.Element => {
  const { state: heroesState, dispatch: heroesDispatch } = useHeroesContext();

  const navigate = useNavigate();
  const location = useLocation();

  const { q = "" } = queryString.parse(location.search);

  const { formState, onInputChange } = useForm({
    searchText: q as string,
  });

  const onSearchSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const heroName = formState.searchText.trim();

    void navigate(`?q=${heroName}`);
  };

  const handleGetHeroes = async (): Promise<void> => {
    const heroName = q as string;

    const data = await heroService.getAll();

    heroesDispatch({ type: "SET_HEROES", payload: data });
    heroesDispatch({ type: "SET_HEROES_BY_NAME", payload: heroName });
  };

  useEffect(() => {
    const heroName = q as string;

    heroesDispatch({ type: "SET_HEROES_BY_NAME", payload: heroName });
  }, [q]);

  useEffect(() => {
    void handleGetHeroes();
  }, []);

  return (
    <main>
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

          <button type="submit" aria-label="Search for a hero" className="search-page__form-submit">
            Search
          </button>
        </form>

        <article className="search-page__list">
          <h4 className="search-page__default-label">Results</h4>

          <div className="search-page__search-label" style={{ display: q === "" ? "" : "none" }}>
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
    </main>
  );
};

export default SearchPage;
