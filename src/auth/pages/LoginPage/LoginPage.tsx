import { useMemo } from "react";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

import { FormDataAuth } from "../../../entities/entities";

import { useAuthContext } from "../../context/AuthProvider";
import { useForm } from "../../../hooks/useForm";

import "./login.css";

const formData: FormDataAuth = {
  email: "",
  password: "",
};

export const LoginPage = (): JSX.Element => {
  const {
    authState,
    checkingAuthentication,
    startLoginWithEmailPassword,
    startGoogleSignIn,
  } = useAuthContext();

  const { formState, onInputChange, onResetForm } =
    useForm<FormDataAuth>(formData);

  const isChecking = useMemo(() => {
    if (authState?.logged === "checking") return true;

    return false;
  }, [authState?.logged]);

  const onLogin: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!formState.email || !formState.password) {
      onResetForm();
      checkingAuthentication("not-authenticated");
      return;
    }

    startLoginWithEmailPassword("checking", {
      email: formState.email,
      password: formState.password,
    });
  };

  const onGoogleSignIn = (): void => {
    startGoogleSignIn("checking");
  };

  return (
    <section className="login_container">
      <article className="login_container_img">
        <img
          src="https://c.tenor.com/3Im54mMMkiUAAAAC/the-flash-running.gif"
          alt="gif"
        ></img>
      </article>

      <form onSubmit={onLogin} className="login_container_form">
        <h2>Hello, do you want to be a superhero?</h2>
        <input
          type="text"
          placeholder={"Enter your email..."}
          name="email"
          value={formState.email}
          onChange={onInputChange}
        ></input>
        <input
          type="password"
          placeholder={"Enter your password..."}
          name="password"
          value={formState.password}
          onChange={onInputChange}
        ></input>
        <button
          type="submit"
          className="login-button"
          disabled={isChecking}
          aria-label="simple login"
        >
          Login
        </button>
        {!isChecking && (
          <Link
            to="/register"
            className="login-button"
            aria-label="go to register page"
          >
            Register
          </Link>
        )}
        <button
          type="button"
          className="login-button"
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
