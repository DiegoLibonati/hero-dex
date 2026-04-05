export interface Hero {
  id: number;
  name: string;
  images: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
  slug: string;
  biography: {
    fullName: string;
    alterEgos: string;
    aliases: string[];
    placeOfBirth: string;
    firstAppearance: string;
    publisher: string;
    alignment: string;
  };
  appearance: {
    gender: string;
    race: string;
    height: string[];
    weight: string[];
    eyeColor: string;
    hairColor: string;
  };
  powerstats: {
    intelligence: number;
    strength: number;
    speed: number;
    durability: number;
    power: number;
    combat: number;
  };
  work: {
    occupation: string;
    base: string;
  };
  connections: {
    groupAffiliation: string;
    relatives: string;
  };
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}

export interface UserLogin {
  email: string;
  password: string;
  username: string;
}
export type UserLoginWithoutUsername = Omit<UserLogin, "username">;
