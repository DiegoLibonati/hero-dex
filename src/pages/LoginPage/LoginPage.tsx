import { useMemo } from "react";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

import { User } from "@src/entities/app";
import { FormDataAuth } from "@src/entities/forms";

import {
  loginWithEmailPassword,
  signInWithGoogle,
} from "@src/firebase/providers";

import { useForm } from "@src/hooks/useForm";
import { useAuthContext } from "@src/hooks/useAuthContext";

import "@src/pages/LoginPage/LoginPage.css";

const formData: FormDataAuth = {
  email: "",
  password: "",
};

export const LoginPage = (): JSX.Element => {
  const { state: authState, dispatch: authDispatch } = useAuthContext();

  const { formState, onInputChange, onResetForm } =
    useForm<FormDataAuth>(formData);

  const isChecking = useMemo(() => {
    if (authState?.logged === "checking") return true;

    return false;
  }, [authState?.logged]);

  const onLogin: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!formState.email || !formState.password) {
      onResetForm();
      authDispatch({
        type: "CHECKING_CREDENTIALS",
        payload: "not-authenticated",
      });
      return;
    }

    authDispatch({ type: "CHECKING_CREDENTIALS", payload: "checking" });

    const result = await loginWithEmailPassword(
      formState.email,
      formState.password
    );

    if (!result.ok)
      return authDispatch({
        type: "AUTH_LOGOUT",
        payload: { errorMessage: result.errorMessage },
      });

    const user: User = {
      uid: result.uid,
      displayName: result.displayName,
      email: result.email,
      photoURL: result.photoURL,
    };

    authDispatch({ type: "AUTH_LOGIN", payload: user });
  };

  const onGoogleSignIn = async (): Promise<void> => {
    authDispatch({ type: "CHECKING_CREDENTIALS", payload: "checking" });

    const result = await signInWithGoogle();

    if (!result.ok)
      return authDispatch({
        type: "AUTH_LOGOUT",
        payload: { errorMessage: result.errorMessage },
      });

    const user: User = {
      uid: result.uid,
      displayName: result.displayName,
      email: result.email,
      photoURL: result.photoURL,
    };

    authDispatch({ type: "AUTH_LOGIN", payload: user });
  };

  return (
    <section className="login-page">
      <article className="login-page__picture">
        <img
          src="https://c.tenor.com/3Im54mMMkiUAAAAC/the-flash-running.gif"
          alt="gif"
          className="login-page__img"
        ></img>
      </article>

      <form onSubmit={onLogin} className="login-page__form">
        <h2 className="login-page__form-title">
          Hello, do you want to be a superhero?
        </h2>
        <input
          type="text"
          placeholder={"Enter your email..."}
          name="email"
          className="login-page__form-input"
          value={formState.email}
          onChange={onInputChange}
        ></input>
        <input
          type="password"
          placeholder={"Enter your password..."}
          name="password"
          className="login-page__form-input"
          value={formState.password}
          onChange={onInputChange}
        ></input>
        <button
          type="submit"
          className="login-page__form-submit"
          disabled={isChecking}
          aria-label="simple login"
        >
          Login
        </button>
        {!isChecking && (
          <Link
            to="/auth/register"
            className="login-page__form-submit"
            aria-label="go to register page"
          >
            Register
          </Link>
        )}
        <button
          type="button"
          className="login-page__form-submit"
          aria-label="login with google"
          onClick={onGoogleSignIn}
          disabled={isChecking}
        >
          <FaGoogle></FaGoogle>
        </button>
      </form>
    </section>
  );
};
