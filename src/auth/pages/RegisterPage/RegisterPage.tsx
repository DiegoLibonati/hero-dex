import React from "react";

import { FormDataAuth } from "../../../entities/entities";

import { useAuthContext } from "../../context/AuthProvider";
import { useForm } from "../../../hooks/useForm";

import "./register.css";

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
    <section className="register_container">
      <article className="register_container_img">
        <img
          src="https://i.pinimg.com/originals/96/b0/83/96b083f5f824d2b8b342047b66832276.gif"
          alt="gif"
        ></img>
      </article>

      <form onSubmit={onSubmit} className="register_container_form">
        <h2>You are one step away from being a superhero.</h2>
        <input
          type="text"
          placeholder={"Enter one username..."}
          name="username"
          value={formState.username}
          onChange={onInputChange}
        ></input>

        <input
          type="text"
          placeholder={"Enter one email..."}
          name="email"
          value={formState.email}
          onChange={onInputChange}
        ></input>

        <input
          type="password"
          placeholder={"Enter one password..."}
          name="password"
          value={formState.password}
          onChange={onInputChange}
        ></input>
        <button className="register-button" aria-label="register" type="submit">
          Register
        </button>
      </form>
    </section>
  );
};
