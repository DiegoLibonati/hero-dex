import { GetHeroesResponse } from "@src/entities/responses";

import { heroesApi } from "@src/api/heroes";

export const getHeroes = async (): Promise<GetHeroesResponse> => {
  try {
    const response = await heroesApi.get("/api/all.json", {
      method: "GET",
    });

    const data: GetHeroesResponse = await response.data;

    return data;
  } catch (e) {
    console.log("Error fetching heroes: ", e);
    throw Error(`Error fetching heroes: ${e}`);
  }
};
