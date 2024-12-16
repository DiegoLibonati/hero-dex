// TYPES

export type Hero = {
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
};

export type Config = {
  apiUrl: string;
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
};

export type FormDataAuth = {
  email: string;
  password: string;
  username?: string;
};

export type User = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
};

export type UserLogin = { email: string; password: string; username: string };
export type UserLoginWithoutUsername = Omit<UserLogin, "username">;

export type AuthContext = {
  authState: AuthState;
  login: (payload: User) => void;
  logout: () => void;
  checkingAuthentication: (status: string) => void;
  startGoogleSignIn: (status: string) => Promise<void>;
  startCreatingUserWithEmail: (
    status: string,
    userLogin: UserLogin
  ) => Promise<void>;
  startLoginWithEmailPassword: (
    status: string,
    userLogin: UserLoginWithoutUsername
  ) => Promise<void>;
  startLogOutWithButton: () => Promise<void>;
  clearErrorMessage: () => void;
};

export type AuthState = {
  logged: string;
  errorMessage: string;
} & User;

export type AuthPayloadReducer =
  | { type: "AUTH_LOGOUT"; payload: { errorMessage: string } }
  | { type: "AUTH_LOGIN"; payload: User }
  | { type: "CHECKING_CREDENTIALS"; payload: string }
  | { type: "CLEAR_ERROR_MESSAGE" };

export type HeroesState = {
  heroes: Hero[];
  heroesCopy: Hero[];
  publishers: string[];
};

export type HeroesContext = {
  heroesState: HeroesState;
  loading: boolean;
  handleSetPublisher: (publisher: string) => void;
  handleSearchHeroes: (search: string) => void;
  // handleHeroId: (id: number) => void;
};

export type HeroesPayloadReducer =
  | { type: "SET_HEROES"; payload: Hero[] }
  | { type: "SET_PUBLISHER"; payload: string }
  | { type: "SET_HEROES_BY_NAME"; payload: string };

// Firebase
type FirebaseOkTrue = {
  ok: true;
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
};

type FirebaseOkFalse = {
  ok: false;
  errorCode: string;
  errorMessage: string;
};

export type SignInWithGoogle = FirebaseOkTrue | FirebaseOkFalse;
export type RegisterUserWithEmail = FirebaseOkTrue | FirebaseOkFalse;
export type LoginWithEmailPassword = FirebaseOkTrue | FirebaseOkFalse;
