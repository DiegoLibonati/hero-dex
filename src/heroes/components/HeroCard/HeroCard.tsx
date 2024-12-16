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
    <li className="card_container animate__animated animate__fadeIn">
      <div className="card_container_header">
        <img src={lg} alt={name}></img>
      </div>

      <div className="card_container_information">
        <h2>{name}</h2>
        <h3>{slug}</h3>
        <h4>{publisher}</h4>
        <h5>{fullName}</h5>

        <Link
          to={`/hero/${id}`}
          className="button-card"
          aria-label="learn more"
        >
          LEARN MORE
        </Link>
      </div>
    </li>
  );
};
