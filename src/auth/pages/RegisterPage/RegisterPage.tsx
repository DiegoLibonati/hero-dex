import React from "react";

import { FormDataAuth } from "@src/entities/entities";

import { useAuthContext } from "@src/auth/context/AuthProvider";
import { useForm } from "@src/hooks/useForm";

import "@src/auth/pages/RegisterPage/RegisterPage.css";

const formData: FormDataAuth = {
  email: "",
  username: "",
  password: "",
};

export const RegisterPage = (): JSX.Element => {
  const { startCreatingUserWithEmail } = useAuthContext();

  const { formState, onInputChange, onResetForm } =
    useForm<FormDataAuth>(formData);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!formState.email || !formState.password || !formState.username) {
      onResetForm();
      return;
    }

    startCreatingUserWithEmail("checking", {
      email: formState.email,
      password: formState.password,
      username: formState.username!,
    });
  };

  return (
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
        <button
          className="register-page__form-submit"
          aria-label="register"
          type="submit"
        >
          Register
        </button>
      </form>
    </section>
  );
};
