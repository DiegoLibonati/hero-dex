import { http, HttpResponse } from "msw";

import { mockHeroes } from "@tests/__mocks__/heroes.mock";

export const mockMswHandlers = [
  http.get("/superhero-api/api/all.json", () => {
    return HttpResponse.json(mockHeroes);
  }),
];
