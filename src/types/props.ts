import { Hero } from "@/types/app";

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

export type AuthProviderProps = DefaultProps;

export type HeroesProviderProps = DefaultProps;
