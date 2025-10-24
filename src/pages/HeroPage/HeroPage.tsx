import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getHeroById } from "@src/helpers/getHeroById";

import { useHeroesContext } from "@src/hooks/useHeroesContext";

import { getHeroes } from "@src/api/get/getHeroes";

import "@src/pages/HeroPage/HeroPage.css";

export const HeroPage = (): JSX.Element => {
  const { state: heroesState, dispatch: heroesDispatch } = useHeroesContext();
  const { heroId } = useParams();

  const hero = useMemo(
    () => getHeroById(heroId!, heroesState.heroesCopy),
    [heroId, heroesState.heroesCopy.length]
  );

  const handleGetHeroes = async () => {
    const data = await getHeroes();

    heroesDispatch({ type: "SET_HEROES", payload: data });
  };

  const navigate = useNavigate();

  const onNavigateBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    handleGetHeroes();
  }, []);

  if (!hero && heroesState.heroesCopy.length) navigate("/index");

  return (
    <section className="hero-page">
      <img
        className="hero-page__background animate__animated animate__fadeIn"
        src={hero?.images.lg}
        alt={hero?.name}
      ></img>

      <article className="hero-page__information">
        <h3 className="hero-page__name">{hero?.name}</h3>
        <ul className="hero-page__stats">
          <li className="hero-page__stat">
            <b className="hero-page__stat-title">Slug: </b>
            {hero?.slug}
          </li>

          <li className="hero-page__stat">
            <b className="hero-page__stat-title">PowerStats: </b>
            <p className="hero-page__stat-text">
              Intelligence: {hero?.powerstats.intelligence}
            </p>
            <p className="hero-page__stat-text">
              Strength: {hero?.powerstats.strength}
            </p>
            <p className="hero-page__stat-text">
              Speed: {hero?.powerstats.speed}
            </p>
            <p className="hero-page__stat-text">
              Durability: {hero?.powerstats.durability}
            </p>
            <p className="hero-page__stat-text">
              Power: {hero?.powerstats.power}
            </p>
            <p className="hero-page__stat-text">
              Combat: {hero?.powerstats.combat}
            </p>
          </li>

          <li className="hero-page__stat">
            <b className="hero-page__stat-title">Appearance: </b>
            <p className="hero-page__stat-text">
              Gender: {hero?.appearance.gender}
            </p>
            <p className="hero-page__stat-text">
              Race: {hero?.appearance.race}
            </p>
            <p className="hero-page__stat-text">
              Height: {hero?.appearance.height[1]}
            </p>
            <p className="hero-page__stat-text">
              Weight: {hero?.appearance.weight[1]}
            </p>
            <p className="hero-page__stat-text">
              Eye color: {hero?.appearance.eyeColor}
            </p>
            <p className="hero-page__stat-text">
              Hair color: {hero?.appearance.hairColor}
            </p>
          </li>

          <li className="hero-page__stat">
            <b className="hero-page__stat-title">Biography: </b>
            <p className="hero-page__stat-text">
              Fullname: {hero?.biography.fullName}
            </p>
            <p className="hero-page__stat-text">
              alter egos: {hero?.biography.alterEgos}
            </p>
            <p className="hero-page__stat-text">
              place Of Birth: {hero?.biography.placeOfBirth}
            </p>
            <p className="hero-page__stat-text">
              first Appearance: {hero?.biography.firstAppearance}
            </p>
            <p className="hero-page__stat-text">
              publisher: {hero?.biography.publisher}
            </p>
            <p className="hero-page__stat-text">
              alignment: {hero?.biography.alignment}
            </p>
          </li>

          <li className="hero-page__stat">
            <b className="hero-page__stat-title">Works: </b>
            <p className="hero-page__stat-text">
              occupation: {hero?.work.occupation}
            </p>
            <p className="hero-page__stat-text">base: {hero?.work.base}</p>
          </li>

          <li className="hero-page__stat">
            <b className="hero-page__stat-title">Connections: </b>
            <p className="hero-page__stat-text">
              group Affiliation: {hero?.connections.groupAffiliation}
            </p>
            <p className="hero-page__stat-text">
              Relatives: {hero?.connections.relatives}
            </p>
          </li>

          <img
            src={hero?.images.md}
            alt={hero?.name}
            className="hero-page__img animate__animated animate__fadeIn"
          />
        </ul>

        <button
          onClick={onNavigateBack}
          aria-label="back"
          type="button"
          className="hero-page__btn-back"
        >
          Back...
        </button>
      </article>
    </section>
  );
};
