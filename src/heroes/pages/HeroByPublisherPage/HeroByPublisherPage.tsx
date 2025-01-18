import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

import { HeroList } from "../../components/HeroList/HeroList";
import { Loader } from "../../../ui/components/Loader/Loader";

import { useHeroesContext } from "../../context/HeroesProvider";

import "./HeroByPublisherPage.css";

export const HeroByPublisherPage = (): JSX.Element => {
  const [selectPublisher, setSelectPublisher] = useState("ALL");

  const { heroesState, loading, handleSetPublisher } = useHeroesContext();

  const navigate = useNavigate();
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);

  useEffect(() => {
    const queryParam = q as string;

    handleSetPublisher(queryParam);
    setSelectPublisher(queryParam);
  }, [q]);

  const handleSelectOption: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    navigate(`?q=${e.target.value}`);
  };

  return (
    <Fragment>
      <section className="index__page">
        <form className="form__index">
          <h2>SELECT YOUR FAVORITE PUBLISHER</h2>
          <select
            onChange={(e) => handleSelectOption(e)}
            value={selectPublisher}
          >
            <option value="ALL">All</option>
            {heroesState.publishers.map((publisher) => (
              <option key={publisher} value={publisher}>
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
    </Fragment>
  );
};
