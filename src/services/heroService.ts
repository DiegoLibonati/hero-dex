import axios from "axios";

import type { Hero } from "@/types/app";
import type { ResponseDirect } from "@/types/responses";

import { apiHeroes } from "@/services/axios";

const heroService = {
  getAll: async (): Promise<ResponseDirect<Hero[]>> => {
    try {
      const request = await apiHeroes.get<ResponseDirect<Hero[]>>("/api/all.json", {
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

export default heroService;
