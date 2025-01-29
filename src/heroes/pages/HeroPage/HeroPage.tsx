import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useHeroesContext } from "../../context/HeroesProvider";
import { getHeroById } from "../../helpers/getHeroById";

import "./HeroPage.css";

export const HeroPage = (): JSX.Element => {
  const { heroesState } = useHeroesContext();
  const { heroId } = useParams();

  const hero = useMemo(
    () => getHeroById(heroId!, heroesState.heroesCopy),
    [heroId, heroesState.heroesCopy.length]
  );

  const navigate = useNavigate();

  const onNavigateBack = () => {
    navigate(-1);
  };

  if (!hero && heroesState.heroesCopy.length) navigate("/index");

  return (
    <section className="hero-page">
      <img
        className="hero-page__background animate__animated animate__fadeIn"
        src={hero?.images.lg}
        alt={hero?.name}
      ></img>

      <article className="hero-page__information">
        <h3 className="hero-page__information-name">{hero?.name}</h3>
        <ul className="hero-page__information-list">
          <li className="hero-page__information-list-item">
            <b className="hero-page__information-list-item-title">Slug: </b>
            {hero?.slug}
          </li>

          <li className="hero-page__information-list-item">
            <b className="hero-page__information-list-item-title">
              PowerStats:{" "}
            </b>
            <p className="hero-page__information-list-item-text">
              Intelligence: {hero?.powerstats.intelligence}
            </p>
            <p className="hero-page__information-list-item-text">
              Strength: {hero?.powerstats.strength}
            </p>
            <p className="hero-page__information-list-item-text">
              Speed: {hero?.powerstats.speed}
            </p>
            <p className="hero-page__information-list-item-text">
              Durability: {hero?.powerstats.durability}
            </p>
            <p className="hero-page__information-list-item-text">
              Power: {hero?.powerstats.power}
            </p>
            <p className="hero-page__information-list-item-text">
              Combat: {hero?.powerstats.combat}
            </p>
          </li>

          <li className="hero-page__information-list-item">
            <b className="hero-page__information-list-item-title">
              Appearance:{" "}
            </b>
            <p className="hero-page__information-list-item-text">
              Gender: {hero?.appearance.gender}
            </p>
            <p className="hero-page__information-list-item-text">
              Race: {hero?.appearance.race}
            </p>
            <p className="hero-page__information-list-item-text">
              Height: {hero?.appearance.height[1]}
            </p>
            <p className="hero-page__information-list-item-text">
              Weight: {hero?.appearance.weight[1]}
            </p>
            <p className="hero-page__information-list-item-text">
              Eye color: {hero?.appearance.eyeColor}
            </p>
            <p className="hero-page__information-list-item-text">
              Hair color: {hero?.appearance.hairColor}
            </p>
          </li>

          <li className="hero-page__information-list-item">
            <b className="hero-page__information-list-item-title">
              Biography:{" "}
            </b>
            <p className="hero-page__information-list-item-text">
              Fullname: {hero?.biography.fullName}
            </p>
            <p className="hero-page__information-list-item-text">
              alter egos: {hero?.biography.alterEgos}
            </p>
            <p className="hero-page__information-list-item-text">
              place Of Birth: {hero?.biography.placeOfBirth}
            </p>
            <p className="hero-page__information-list-item-text">
              first Appearance: {hero?.biography.firstAppearance}
            </p>
            <p className="hero-page__information-list-item-text">
              publisher: {hero?.biography.publisher}
            </p>
            <p className="hero-page__information-list-item-text">
              alignment: {hero?.biography.alignment}
            </p>
          </li>

          <li className="hero-page__information-list-item">
            <b className="hero-page__information-list-item-title">Works: </b>
            <p className="hero-page__information-list-item-text">
              occupation: {hero?.work.occupation}
            </p>
            <p className="hero-page__information-list-item-text">
              base: {hero?.work.base}
            </p>
          </li>

          <li className="hero-page__information-list-item">
            <b className="hero-page__information-list-item-title">
              Connections:{" "}
            </b>
            <p className="hero-page__information-list-item-text">
              group Affiliation: {hero?.connections.groupAffiliation}
            </p>
            <p className="hero-page__information-list-item-text">
              Relatives: {hero?.connections.relatives}
            </p>
          </li>

          <img
            src={hero?.images.md}
            alt={hero?.name}
            className="hero-page__information-list-img animate__animated animate__fadeIn"
          />
        </ul>

        <button
          onClick={onNavigateBack}
          aria-label="back"
          type="button"
          className="hero-page__information-btn-back"
        >
          Back...
        </button>
      </article>
    </section>
  );
};
