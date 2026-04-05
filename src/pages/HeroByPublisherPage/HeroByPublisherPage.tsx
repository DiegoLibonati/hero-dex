import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

import HeroList from "@/components/HeroList/HeroList";
import Loader from "@/components/Loader/Loader";

import { useHeroesContext } from "@/hooks/useHeroesContext";

import heroeService from "@/services/heroeService";

import "@/pages/HeroByPublisherPage/HeroByPublisherPage.css";

const HeroByPublisherPage = () => {
  const [selectPublisher, setSelectPublisher] = useState("ALL");
  const [loading, setLoading] = useState<boolean>(false);

  const { state: heroesState, dispatch: heroesDispatch } = useHeroesContext();

  const navigate = useNavigate();
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);

  const handleGetHeroes = async () => {
    const queryParam = q as string;

    setLoading(true);

    const data = await heroeService.getAll();

    heroesDispatch({ type: "SET_HEROES", payload: data });
    heroesDispatch({ type: "SET_PUBLISHER", payload: queryParam });

    setLoading(false);
  };

  useEffect(() => {
    const queryParam = q as string;

    heroesDispatch({ type: "SET_PUBLISHER", payload: queryParam });
    setSelectPublisher(queryParam);
  }, [q]);

  useEffect(() => {
    handleGetHeroes();
  }, []);

  const handleSelectOption: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    navigate(`?q=${e.target.value}`);
  };

  return (
    <main>
      <section className="index-page">
        <form className="index-page__form">
          <h2 className="index-page__form-title">SELECT YOUR FAVORITE PUBLISHER</h2>
          <select
            onChange={(e) => handleSelectOption(e)}
            value={selectPublisher}
            className="index-page__form-select"
          >
            <option value="ALL" className="index-page__form-select-option">
              All
            </option>
            {heroesState.publishers.map((publisher) => (
              <option key={publisher} value={publisher} className="index-page__form-select-option">
                {publisher}
              </option>
            ))}
          </select>
        </form>
      </section>

      {loading ? (
        <Loader></Loader>
      ) : (
        <HeroList heroes={heroesState.heroes} quantity={10}></HeroList>
      )}
    </main>
  );
};

export default HeroByPublisherPage;
