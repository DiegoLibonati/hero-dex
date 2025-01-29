import { Link } from "react-router-dom";

import "./HeroCard.css";

interface HeroCardProps {
  id: number;
  name: string;
  images: {
    lg: string;
  };
  slug: string;
  biography: {
    fullName: string;
    publisher: string;
  };
}

export const HeroCard = ({
  id,
  name,
  images,
  slug,
  biography,
}: HeroCardProps): JSX.Element => {
  const { lg } = images;
  const { fullName, publisher } = biography;

  return (
    <li className="hero-card animate__animated animate__fadeIn">
      <div className="hero-card__header">
        <img src={lg} alt={name} className="hero-card__header-img"></img>
      </div>

      <div className="hero-card__information">
        <h2 className="hero-card__information-name">{name}</h2>
        <h3 className="hero-card__information-slug">{slug}</h3>
        <h4 className="hero-card__information-publisher">{publisher}</h4>
        <h5 className="hero-card__information-fullname">{fullName}</h5>

        <Link
          to={`/hero/${id}`}
          className="hero-card__information-btn-learn-more"
          aria-label="learn more"
        >
          LEARN MORE
        </Link>
      </div>
    </li>
  );
};
