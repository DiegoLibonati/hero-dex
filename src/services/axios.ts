import axios from "axios";

export const apiHeroes = axios.create({
  baseURL: "/superhero-api",
});
