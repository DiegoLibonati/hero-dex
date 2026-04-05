import React from "react";

import { User } from "@/types/app";
import { FormDataAuth } from "@/types/forms";

import { registerUserWithEmail } from "@/firebase/providers";

import { useAuthContext } from "@/hooks/useAuthContext";
import { useForm } from "@/hooks/useForm";

import "@/pages/RegisterPage/RegisterPage.css";

const formData: FormDataAuth = {
  email: "",
  username: "",
  password: "",
};

const RegisterPage = () => {
  const { dispatch: authDispatch } = useAuthContext();

  const { formState, onInputChange, onResetForm } = useForm<FormDataAuth>(formData);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!formState.email || !formState.password || !formState.username) {
      onResetForm();
      return;
    }

    authDispatch({ type: "CHECKING_CREDENTIALS", payload: "checking" });

    const result = await registerUserWithEmail(
      formState.email,
      formState.password,
      formState.username
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

  return (
    <main>
      <section className="register-page">
        <article className="register-page__picture">
          <img
            src="https://i.pinimg.com/originals/96/b0/83/96b083f5f824d2b8b342047b66832276.gif"
            alt="gif"
            className="register-page__img"
          ></img>
        </article>

        <form onSubmit={onSubmit} className="register-page__form">
          <h2 className="register-page__form-title">
            You are one step away from being a superhero.
          </h2>
          <input
            type="text"
            placeholder={"Enter one username..."}
            name="username"
            className="register-page__form-input"
            value={formState.username}
            onChange={onInputChange}
          ></input>

          <input
            type="text"
            placeholder={"Enter one email..."}
            name="email"
            className="register-page__form-input"
            value={formState.email}
            onChange={onInputChange}
          ></input>

          <input
            type="password"
            placeholder={"Enter one password..."}
            name="password"
            className="register-page__form-input"
            value={formState.password}
            onChange={onInputChange}
          ></input>
          <button className="register-page__form-submit" aria-label="register" type="submit">
            Register
          </button>
        </form>
      </section>
    </main>
  );
};

export default RegisterPage;
