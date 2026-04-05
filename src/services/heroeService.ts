import axios from "axios";

import type { Hero } from "@/types/app";

import { apiHeroes } from "@/services/axios";

const heroeService = {
  getAll: async (): Promise<Hero[]> => {
    try {
      const request = await apiHeroes.get("/api/all.json", {
        method: "GET",
      });
      return request.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(`HTTP error! status: ${e.response?.status} - ${e.message}`);
      }
      throw e;
    }
  },
};

export default heroeService;
