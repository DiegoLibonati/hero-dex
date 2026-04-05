import { Link } from "react-router-dom";

import type { JSX } from "react";
import type { HeroCardProps } from "@/types/props";

import "@/components/HeroCard/HeroCard.css";

const HeroCard = ({ id, name, images, slug, biography }: HeroCardProps): JSX.Element => {
  const { lg } = images;
  const { fullName, publisher } = biography;

  return (
    <li className="hero-card animate__animated animate__fadeIn">
      <div className="hero-card__header">
        <img src={lg} alt={name} className="hero-card__img"></img>
      </div>

      <div className="hero-card__information">
        <h2 className="hero-card__name">{name}</h2>
        <h3 className="hero-card__slug">{slug}</h3>
        <h4 className="hero-card__publisher">{publisher}</h4>
        <h5 className="hero-card__fullname">{fullName}</h5>

        <Link
          to={`/hero/${id}`}
          className="hero-card__btn-learn-more"
          aria-label={`Learn more about ${name}`}
        >
          LEARN MORE
        </Link>
      </div>
    </li>
  );
};

export default HeroCard;
