import { Hero } from "@src/entities/app";

import { heroesApi } from "@src/api/heroes";

export const getHeroes = async (): Promise<Hero[]> => {
  try {
    const response = await heroesApi.get("/api/all.json", {
      method: "GET",
    });

    const data: Hero[] = await response.data;

    return data;
  } catch (e) {
    console.log("Error fetching heroes: ", e);
    throw Error(`Error fetching heroes: ${e}`);
  }
};
