import { Hero } from "@src/entities/app";

interface DefaultProps {
  className?: string;
  children?: React.ReactNode;
}

export interface HeroCardProps {
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

export interface HeroListProps {
  heroes: Hero[];
  quantity: number;
}

export interface AuthProviderProps extends DefaultProps {}

export interface HeroesProviderProps extends DefaultProps {}
