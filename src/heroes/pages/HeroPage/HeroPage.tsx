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
    <section className="hero__page">
      <img
        className="hero__background animate__animated animate__fadeIn"
        src={hero?.images.lg}
        alt={hero?.name}
      ></img>

      <article className="hero__information">
        <h3>{hero?.name}</h3>
        <ul className="hero__list">
          <li>
            <b>Slug: </b>
            {hero?.slug}
          </li>

          <li>
            <b>PowerStats: </b>
            <p>Intelligence: {hero?.powerstats.intelligence}</p>
            <p>Strength: {hero?.powerstats.strength}</p>
            <p>Speed: {hero?.powerstats.speed}</p>
            <p>Durability: {hero?.powerstats.durability}</p>
            <p>Power: {hero?.powerstats.power}</p>
            <p>Combat: {hero?.powerstats.combat}</p>
          </li>

          <li>
            <b>Appearance: </b>
            <p>Gender: {hero?.appearance.gender}</p>
            <p>Race: {hero?.appearance.race}</p>
            <p>Height: {hero?.appearance.height[1]}</p>
            <p>Weight: {hero?.appearance.weight[1]}</p>
            <p>Eye color: {hero?.appearance.eyeColor}</p>
            <p>Hair color: {hero?.appearance.hairColor}</p>
          </li>

          <li>
            <b>Biography: </b>
            <p>Fullname: {hero?.biography.fullName}</p>
            <p>alter egos: {hero?.biography.alterEgos}</p>
            <p>place Of Birth: {hero?.biography.placeOfBirth}</p>
            <p>first Appearance: {hero?.biography.firstAppearance}</p>
            <p>publisher: {hero?.biography.publisher}</p>
            <p>alignment: {hero?.biography.alignment}</p>
          </li>

          <li>
            <b>Works: </b>
            <p>occupation: {hero?.work.occupation}</p>
            <p>base: {hero?.work.base}</p>
          </li>

          <li>
            <b>Connections: </b>
            <p>group Affiliation: {hero?.connections.groupAffiliation}</p>
            <p>Relatives: {hero?.connections.relatives}</p>
          </li>

          <img
            src={hero?.images.md}
            alt={hero?.name}
            className="hero__img animate__animated animate__fadeIn"
          />
        </ul>

        <button onClick={onNavigateBack} aria-label="back" type="button">
          Back...
        </button>
      </article>
    </section>
  );
};
