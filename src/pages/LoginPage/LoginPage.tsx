import { useMemo } from "react";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

import { User } from "@/types/app";
import { FormDataAuth } from "@/types/forms";

import { loginWithEmailPassword, signInWithGoogle } from "@/firebase/providers";

import { useForm } from "@/hooks/useForm";
import { useAuthContext } from "@/hooks/useAuthContext";

import "@/pages/LoginPage/LoginPage.css";

const formData: FormDataAuth = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const { state: authState, dispatch: authDispatch } = useAuthContext();

  const { formState, onInputChange, onResetForm } = useForm<FormDataAuth>(formData);

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

    const result = await loginWithEmailPassword(formState.email, formState.password);

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
    <main>
      <section className="login-page">
        <article className="login-page__picture">
          <img
            src="https://c.tenor.com/3Im54mMMkiUAAAAC/the-flash-running.gif"
            alt="gif"
            className="login-page__img"
          ></img>
        </article>

        <form onSubmit={onLogin} className="login-page__form">
          <h2 className="login-page__form-title">Hello, do you want to be a superhero?</h2>
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
            aria-label="Sign in with email and password"
          >
            Login
          </button>
          {!isChecking && (
            <Link
              to="/register"
              className="login-page__form-submit"
              aria-label="Go to registration page"
            >
              Register
            </Link>
          )}
          <button
            type="button"
            className="login-page__form-submit"
            aria-label="Sign in with Google"
            onClick={onGoogleSignIn}
            disabled={isChecking}
          >
            <FaGoogle></FaGoogle>
          </button>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
